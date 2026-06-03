import chromadb
from langchain_chroma import Chroma
from app.services.embedding_service import get_embeddings
from app.core.config import settings
from app.core.logging import setup_logger
from typing import List

logger = setup_logger(__name__)

_vectorstore = None


def get_vectorstore() -> Chroma:
    global _vectorstore
    if _vectorstore is None:
        logger.info("Connecting to ChromaDB...")
        _vectorstore = Chroma(
            collection_name=settings.COLLECTION_NAME,
            embedding_function=get_embeddings(),
            persist_directory=settings.CHROMA_DB_PATH,
        )
    return _vectorstore


def clear_collection():
    global _vectorstore
    logger.info("Clearing existing ChromaDB collection...")
    try:
        client = chromadb.PersistentClient(path=settings.CHROMA_DB_PATH)
        client.delete_collection(settings.COLLECTION_NAME)
        _vectorstore = None
        logger.info("Collection cleared successfully")
    except Exception as e:
        logger.warning(f"Could not clear collection: {e}")


def store_chunks(chunks: List[dict]):
    if not chunks:
        logger.warning("No chunks to store")
        return

    vectorstore = get_vectorstore()

    texts = [c["text"] for c in chunks]
    metadatas = [c["metadata"] for c in chunks]

    vectorstore.add_texts(texts=texts, metadatas=metadatas)
    logger.info(f"Stored {len(chunks)} chunks in ChromaDB")


def get_retriever():
    vectorstore = get_vectorstore()
    return vectorstore.as_retriever(
        search_kwargs={"k": settings.MAX_RETRIEVAL_DOCS}
    )