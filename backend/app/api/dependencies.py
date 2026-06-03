from app.core.logging import setup_logger

logger = setup_logger(__name__)


def get_session_id(session_id: str = "default") -> str:
    return session_id