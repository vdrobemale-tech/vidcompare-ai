import yt_dlp
from youtube_transcript_api import YouTubeTranscriptApi
from app.core.logging import setup_logger
from app.utils.video_parser import extract_youtube_id
from app.utils.helper import seconds_to_duration, safe_int

logger = setup_logger(__name__)

def get_youtube_metadata(url: str) -> dict:
    logger.info(f"Fetching YouTube metadata for: {url}")
    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "skip_download": True,
        "extractor_args": {
            "youtube": {
                "player_client": ["android"],  # ← changed from tv_embedded
            }
        },
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)

    tags = info.get("tags") or []
    hashtags = [f"#{tag}" for tag in tags[:10]]

    return {
        "title": info.get("title", "Unknown Title"),
        "creator": info.get("uploader", "Unknown Creator"),
        "views": safe_int(info.get("view_count", 0)),
        "likes": safe_int(info.get("like_count", 0)),
        "comments": safe_int(info.get("comment_count", 0)),
        "upload_date": info.get("upload_date", ""),
        "duration": seconds_to_duration(safe_int(info.get("duration", 0))),
        "hashtags": hashtags,
        "follower_count": safe_int(info.get("channel_follower_count", 0)),
        "thumbnail_url": info.get("thumbnail", ""),
        "source": "youtube",
    }

def get_youtube_transcript(url: str) -> str:
    logger.info(f"Fetching YouTube transcript for: {url}")
    video_id = extract_youtube_id(url)
    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        transcript = " ".join([entry["text"] for entry in transcript_list])
        logger.info(f"Transcript fetched — {len(transcript)} chars")
        return transcript
    except Exception as e:
        logger.warning(f"Transcript fetch failed: {e}")
        return ""
