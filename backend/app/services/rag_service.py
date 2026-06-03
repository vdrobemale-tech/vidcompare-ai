from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from app.core.config import settings
from app.core.logging import setup_logger
from app.services.chroma_service import get_retriever
from typing import AsyncGenerator
import json

logger = setup_logger(__name__)

# Simple chat history store
_chat_histories: dict = {}


def get_llm() -> ChatGoogleGenerativeAI:
    return ChatGoogleGenerativeAI(
        model=settings.GEMINI_MODEL,
        google_api_key=settings.GOOGLE_API_KEY,
        temperature=0.3,
    )


def get_chat_history(session_id: str) -> list:
    return _chat_histories.get(session_id, [])


def add_to_history(session_id: str, question: str, answer: str):
    if session_id not in _chat_histories:
        _chat_histories[session_id] = []
    _chat_histories[session_id].append(HumanMessage(content=question))
    _chat_histories[session_id].append(AIMessage(content=answer))


def extract_sources(source_documents: list) -> list:
    sources = []
    seen = set()
    for doc in source_documents:
        meta = doc.metadata
        video_id = meta.get("video_id", "?")
        chunk_index = meta.get("chunk_index", 0)
        label = f"Video {video_id} Chunk {chunk_index + 1}"
        if label not in seen:
            seen.add(label)
            sources.append({
                "video": video_id,
                "chunk": str(chunk_index + 1),
            })
    return sources


async def run_rag_query(question: str, session_id: str = "default") -> dict:
    logger.info(f"RAG query: {question[:60]}...")

    # Get relevant docs
    retriever = get_retriever()
    docs = retriever.invoke(question)

    # Build context from docs
    context = "\n\n".join([
        f"[Video {d.metadata.get('video_id','?')} Chunk {d.metadata.get('chunk_index',0)+1}]\n{d.page_content}"
        for d in docs
    ])

    # Get chat history
    history = get_chat_history(session_id)

    # Build prompt
    system = """You are an expert social media video analyst comparing Video A (YouTube) and Video B (Instagram Reel).
Use the retrieved transcript chunks to answer questions accurately.
Always cite which Video and Chunk your answer is based on.
Context:
{context}"""

    prompt = ChatPromptTemplate.from_messages([
        ("system", system),
        MessagesPlaceholder(variable_name="history"),
        ("human", "{question}"),
    ])

    llm = get_llm()
    chain = prompt | llm

    response = chain.invoke({
        "context": context,
        "history": history,
        "question": question,
    })

    answer = response.content
    sources = extract_sources(docs)

    # Save to history
    add_to_history(session_id, question, answer)

    return {"answer": answer, "sources": sources}


async def stream_rag_response(question: str, session_id: str = "default") -> AsyncGenerator[str, None]:
    logger.info(f"Streaming RAG query: {question[:60]}...")
    result = await run_rag_query(question, session_id)
    answer = result["answer"]
    sources = result["sources"]

    words = answer.split(" ")
    for i, word in enumerate(words):
        chunk = word + (" " if i < len(words) - 1 else "")
        yield f"data: {json.dumps({'type': 'token', 'content': chunk})}\n\n"

    yield f"data: {json.dumps({'type': 'sources', 'content': sources})}\n\n"
    yield f"data: {json.dumps({'type': 'done'})}\n\n"