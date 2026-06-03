from fastapi import APIRouter, HTTPException
from app.schemas.video_schema import VideoAnalyzeRequest, VideoAnalyzeResponse
from app.services.metadata_service import build_video_metadata
from app.services.transcript_service import get_transcript
from app.services.chunking_service import chunk_transcript
from app.services.chroma_service import store_chunks, clear_collection
from app.services.analytics_service import generate_comparison_insights
from app.core.constants import VIDEO_A, VIDEO_B, SOURCE_YOUTUBE, SOURCE_INSTAGRAM
from app.core.logging import setup_logger

logger = setup_logger(__name__)
router = APIRouter()


@router.post("/analyze")
async def analyze_videos(request: VideoAnalyzeRequest):
    try:
        logger.info("Starting video analysis...")

        # Step 1: Clear old data
        clear_collection()

        # Step 2: Get metadata
        meta_a = build_video_metadata(request.youtube_url, SOURCE_YOUTUBE, VIDEO_A)
        meta_b = build_video_metadata(request.instagram_url, SOURCE_INSTAGRAM, VIDEO_B)

        # Step 3: Get transcripts
        transcript_a = get_transcript(request.youtube_url, SOURCE_YOUTUBE)
        transcript_b = get_transcript(request.instagram_url, SOURCE_INSTAGRAM)

        # Step 4: Chunk and store
        chunks_a = chunk_transcript(transcript_a, VIDEO_A, SOURCE_YOUTUBE)
        chunks_b = chunk_transcript(transcript_b, VIDEO_B, SOURCE_INSTAGRAM)

        store_chunks(chunks_a)
        store_chunks(chunks_b)

        # Step 5: Generate comparison insights
        comparison = generate_comparison_insights(meta_a, meta_b)

        logger.info("Video analysis complete!")

        return {
            "status": "success",
            "video_a": meta_a,
            "video_b": meta_b,
            "comparison": comparison,
        }

    except Exception as e:
        logger.error(f"Video analysis failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))