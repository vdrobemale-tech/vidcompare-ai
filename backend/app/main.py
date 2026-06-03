from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logging import setup_logger
from app.api.routes import health_routes, video_routes, chat_routes

logger = setup_logger("main")

app = FastAPI(
    title="Social Media Video Comparison API",
    description="RAG-powered API to compare YouTube and Instagram videos",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(health_routes.router, prefix="/api", tags=["Health"])
app.include_router(video_routes.router, prefix="/api/videos", tags=["Videos"])
app.include_router(chat_routes.router, prefix="/api/chat", tags=["Chat"])


@app.on_event("startup")
async def startup_event():
    logger.info("🚀 Backend started successfully")


@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Backend shutting down")