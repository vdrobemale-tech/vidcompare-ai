import os
import tempfile

def get_youtube_metadata(url: str) -> dict:
    logger.info(f"Fetching YouTube metadata for: {url}")
    
    # Cookies env se temp file mein likho
    cookies_content = os.getenv("YOUTUBE_COOKIES")
    cookies_file = None
    
    if cookies_content:
        tmp = tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False)
        tmp.write(cookies_content)
        tmp.close()
        cookies_file = tmp.name

    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "skip_download": True,
    }
    
    if cookies_file:
        ydl_opts["cookiefile"] = cookies_file

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
    
    # Temp file delete karo
    if cookies_file:
        os.unlink(cookies_file)

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
