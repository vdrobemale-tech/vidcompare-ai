from langchain.prompts import PromptTemplate

COMPARISON_PROMPT_TEMPLATE = """
You are an expert social media video analyst.
You are comparing two videos: Video A (YouTube) and Video B (Instagram Reel).

Use the following retrieved transcript chunks and metadata to answer the question accurately.

Context:
{context}

Chat History:
{chat_history}

Question: {question}

Instructions:
- Always refer to the videos as "Video A" and "Video B".
- Cite specific chunk references when making claims (e.g., "According to Video A Chunk 3...").
- Be specific, insightful, and data-driven.
- If comparing engagement, always include the engagement rate numbers.
- If suggesting improvements, be actionable and clear.

Answer:
"""

COMPARISON_PROMPT = PromptTemplate(
    input_variables=["context", "chat_history", "question"],
    template=COMPARISON_PROMPT_TEMPLATE,
)