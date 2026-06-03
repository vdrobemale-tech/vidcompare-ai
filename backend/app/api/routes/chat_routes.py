from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from app.schemas.chat_schema import ChatRequest
from app.services.rag_service import stream_rag_response, run_rag_query
from app.core.logging import setup_logger

logger = setup_logger(__name__)
router = APIRouter()


@router.post("/stream")
async def chat_stream(request: ChatRequest):
    try:
        logger.info(f"Chat stream request: {request.question[:60]}")
        return StreamingResponse(
            stream_rag_response(request.question, request.session_id or "default"),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "X-Accel-Buffering": "no",
            },
        )
    except Exception as e:
        logger.error(f"Chat stream error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/")
async def chat(request: ChatRequest):
    try:
        result = await run_rag_query(
            request.question,
            request.session_id or "default"
        )
        return result
    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail=str(e))