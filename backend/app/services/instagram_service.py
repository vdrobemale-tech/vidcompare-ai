import os
import yt_dlp
import whisper
from app.core.logging import setup_logger
from app.core.constants import DOWNLOADS_DIR, WHISPER_MODEL
from app.utils.helper import seconds_to_duration, safe_int, ensure_dir

logger = setup_logger(__name__)


def get_instagram_metadata(url: str) -> dict:
    logger.info(f"Fetching Instagram metadata for: {url}")
    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "skip_download": True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)

    description = info.get("description", "")
    hashtags = [
        word for word in description.split() if word.startswith("#")
    ][:10]

    return {
        "title": info.get("title", "Instagram Reel"),
        "creator": info.get("uploader", "Unknown Creator"),
        "views": safe_int(info.get("view_count", 0)),
        "likes": safe_int(info.get("like_count", 0)),
        "comments": safe_int(info.get("comment_count", 0)),
        "upload_date": info.get("upload_date", ""),
        "duration": seconds_to_duration(safe_int(info.get("duration", 0))),
        "hashtags": hashtags,
        "follower_count": safe_int(info.get("channel_follower_count", 0)),
        "thumbnail_url": info.get("thumbnail", ""),
        "source": "instagram",
    }


def get_instagram_transcript(url: str) -> str:
    logger.info(f"Transcribing Instagram reel: {url}")
    ensure_dir(DOWNLOADS_DIR)

    audio_path = os.path.join(DOWNLOADS_DIR, "instagram_audio.mp3")

    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "format": "bestaudio/best",
        "outtmpl": os.path.join(DOWNLOADS_DIR, "instagram_audio.%(ext)s"),
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
            }
        ],
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        logger.info("Audio downloaded, starting Whisper transcription...")
        model = whisper.load_model(WHISPER_MODEL)
        result = model.transcribe(audio_path)
        transcript = result.get("text", "")
        logger.info(f"Transcription done — {len(transcript)} chars")

        # Cleanup audio file
        if os.path.exists(audio_path):
            os.remove(audio_path)

        return transcript

    except Exception as e:
        logger.error(f"Instagram transcription failed: {e}")
        return ""