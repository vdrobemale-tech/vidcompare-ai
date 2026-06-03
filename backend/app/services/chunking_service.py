from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.core.config import settings
from app.core.logging import setup_logger
from typing import List

logger = setup_logger(__name__)


def chunk_transcript(transcript: str, video_id: str, source: str) -> List[dict]:
    if not transcript:
        logger.warning(f"No transcript to chunk for video_id={video_id}")
        return []

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.CHUNK_SIZE,
        chunk_overlap=settings.CHUNK_OVERLAP,
        separators=["\n\n", "\n", ". ", " ", ""],
    )

    chunks = splitter.split_text(transcript)
    logger.info(f"Created {len(chunks)} chunks for video_id={video_id}")

    result = []
    for i, chunk_text in enumerate(chunks):
        result.append({
            "text": chunk_text,
            "metadata": {
                "video_id": video_id,
                "source": source,
                "chunk_index": i,
                "chunk_label": f"Video {video_id} Chunk {i + 1}",
            },
        })

    return result