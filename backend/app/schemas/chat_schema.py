from pydantic import BaseModel
from typing import List, Optional


class ChatRequest(BaseModel):
    question: str
    session_id: Optional[str] = "default"


class SourceCitation(BaseModel):
    video: str
    chunk: str


class ChatResponse(BaseModel):
    answer: str
    sources: List[SourceCitation]