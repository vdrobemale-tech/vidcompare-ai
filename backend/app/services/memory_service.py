from langchain.memory import ConversationBufferMemory
from app.core.logging import setup_logger
from typing import Dict

logger = setup_logger(__name__)

_memory_store: Dict[str, ConversationBufferMemory] = {}


def get_memory(session_id: str = "default") -> ConversationBufferMemory:
    if session_id not in _memory_store:
        logger.info(f"Creating new memory for session: {session_id}")
        _memory_store[session_id] = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True,
            output_key="answer",
        )
    return _memory_store[session_id]


def clear_memory(session_id: str = "default"):
    if session_id in _memory_store:
        del _memory_store[session_id]
        logger.info(f"Memory cleared for session: {session_id}")