from app.services.youtube_service import get_youtube_transcript
from app.services.instagram_service import get_instagram_transcript
from app.utils.transcript_cleaner import clean_transcript
from app.core.logging import setup_logger

logger = setup_logger(__name__)


def get_transcript(url: str, source: str) -> str:
    logger.info(f"Getting transcript for source={source}")

    if source == "youtube":
        raw = get_youtube_transcript(url)
    else:
        raw = get_instagram_transcript(url)

    if not raw:
        logger.warning("Empty transcript received")
        return ""

    cleaned = clean_transcript(raw)
    logger.info(f"Cleaned transcript length: {len(cleaned)} chars")
    return cleaned