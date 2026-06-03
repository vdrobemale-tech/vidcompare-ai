from pydantic import BaseModel, HttpUrl
from typing import Optional, List


class VideoAnalyzeRequest(BaseModel):
    youtube_url: str
    instagram_url: str


class VideoMetadata(BaseModel):
    title: str
    creator: str
    views: int
    likes: int
    comments: int
    upload_date: str
    duration: str
    hashtags: List[str]
    follower_count: int
    engagement_rate: float
    thumbnail_url: Optional[str] = None
    video_id: str
    source: str


class VideoAnalyzeResponse(BaseModel):
    video_a: VideoMetadata
    video_b: VideoMetadata
    status: str = "success"