from urllib.parse import urlparse
from app.core.constants import YOUTUBE_DOMAINS, INSTAGRAM_DOMAINS
from app.core.logging import setup_logger

logger = setup_logger(__name__)


def is_youtube_url(url: str) -> bool:
    parsed = urlparse(url)
    return any(domain in parsed.netloc for domain in YOUTUBE_DOMAINS)


def is_instagram_url(url: str) -> bool:
    parsed = urlparse(url)
    return any(domain in parsed.netloc for domain in INSTAGRAM_DOMAINS)


def extract_youtube_id(url: str) -> str:
    parsed = urlparse(url)
    if "youtu.be" in parsed.netloc:
        return parsed.path.strip("/")
    if "v=" in parsed.query:
        for param in parsed.query.split("&"):
            if param.startswith("v="):
                return param[2:]
    return parsed.path.strip("/").split("/")[-1]


def extract_instagram_shortcode(url: str) -> str:
    parsed = urlparse(url)
    parts = [p for p in parsed.path.strip("/").split("/") if p]
    # /reel/CODE/ or /p/CODE/
    if len(parts) >= 2:
        return parts[1]
    return parts[0] if parts else ""