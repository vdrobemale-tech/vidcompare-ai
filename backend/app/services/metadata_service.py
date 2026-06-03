from app.services.youtube_service import get_youtube_metadata
from app.services.instagram_service import get_instagram_metadata
from app.utils.engagement import calculate_engagement_rate
from app.core.logging import setup_logger

logger = setup_logger(__name__)


def build_video_metadata(url: str, source: str, video_id: str) -> dict:
    logger.info(f"Building metadata for video_id={video_id}, source={source}")

    if source == "youtube":
        meta = get_youtube_metadata(url)
    else:
        meta = get_instagram_metadata(url)

    meta["engagement_rate"] = calculate_engagement_rate(
        likes=meta["likes"],
        comments=meta["comments"],
        views=meta["views"],
    )
    meta["video_id"] = video_id

    # Format upload_date from YYYYMMDD to YYYY-MM-DD
    raw_date = meta.get("upload_date", "")
    if len(raw_date) == 8:
        meta["upload_date"] = f"{raw_date[:4]}-{raw_date[4:6]}-{raw_date[6:]}"

    return meta