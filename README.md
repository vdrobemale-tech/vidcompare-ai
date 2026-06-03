# 🎬 VidCompare AI — YouTube vs Instagram Reel Comparison

An AI-powered full-stack RAG application that compares a YouTube video and an Instagram Reel using transcript analysis, metadata, vector search, and Gemini LLM reasoning.

---

##  Tech Stack

### Backend
- **FastAPI** — REST API + Streaming
- **LangChain** — RAG pipeline
- **ChromaDB** — Vector store
- **Gemini 2.5 Flash** — LLM
- **Google Embeddings** — Text embeddings
- **yt-dlp** — Instagram metadata + audio download
- **Whisper** — Instagram audio transcription
- **youtube-transcript-api** — YouTube transcript

### Frontend
- **React + Vite** — UI framework
- **Tailwind CSS** — Styling
- **Zustand** — State management
- **Axios** — HTTP client
- **React Markdown** — Markdown rendering
- **Lucide React** — Icons

---

##  Project Structure

```
video-compare-ai/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── constants.py
│   │   │   └── logging.py
│   │   ├── api/
│   │   │   ├── dependencies.py
│   │   │   └── routes/
│   │   │       ├── video_routes.py
│   │   │       ├── chat_routes.py
│   │   │       └── health_routes.py
│   │   ├── schemas/
│   │   │   ├── video_schema.py
│   │   │   ├── chat_schema.py
│   │   │   └── response_schema.py
│   │   ├── services/
│   │   │   ├── youtube_service.py
│   │   │   ├── instagram_service.py
│   │   │   ├── metadata_service.py
│   │   │   ├── transcript_service.py
│   │   │   ├── chunking_service.py
│   │   │   ├── embedding_service.py
│   │   │   ├── chroma_service.py
│   │   │   ├── rag_service.py
│   │   │   ├── memory_service.py
│   │   │   └── analytics_service.py
│   │   ├── prompts/
│   │   │   ├── comparison_prompt.py
│   │   │   └── improvement_prompt.py
│   │   └── utils/
│   │       ├── engagement.py
│   │       ├── transcript_cleaner.py
│   │       ├── video_parser.py
│   │       └── helper.py
│   ├── .env
│   ├── .env.example
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── url-input/UrlForm.jsx
    │   │   ├── video/
    │   │   ├── comparison/
    │   │   ├── chat/
    │   │   └── common/
    │   ├── pages/Dashboard.jsx
    │   ├── store/appStore.js
    │   ├── hooks/
    │   ├── services/
    │   └── utils/
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Python 3.10+ (3.13 recommended)
- Node.js 18+
- FFmpeg (required for Whisper audio processing)
- Google AI Studio API Key

---

### 1. Clone / Navigate to project

```bash
cd video-compare-ai
```

---

### 2. Backend Setup

```bash
cd backend
```

**Install dependencies:**
```bash
pip install fastapi uvicorn python-dotenv pydantic pydantic-settings langchain langchain-google-genai langchain-community langchain-chroma langchain-text-splitters chromadb google-generativeai youtube-transcript-api yt-dlp httpx requests python-multipart aiofiles
```

**Create `.env` file:**
```bash
copy .env.example .env
```

**Edit `.env` and add your Google API Key:**
```env
GOOGLE_API_KEY=your_google_api_key_here
GEMINI_MODEL=gemini-2.5-flash
EMBEDDING_MODEL=models/embedding-001
CHROMA_DB_PATH=./app/db/chroma_db
COLLECTION_NAME=video_chunks
CHUNK_SIZE=1000
CHUNK_OVERLAP=200
MAX_RETRIEVAL_DOCS=6
CORS_ORIGINS=http://localhost:5173
```

> Get your free API key at: https://aistudio.google.com/apikey

**Start backend:**
```bash
uvicorn app.main:app --reload --port 8000
```

Backend runs at: `http://localhost:8000`

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
```

**Install dependencies:**
```bash
npm install --legacy-peer-deps
```

**Start frontend:**
```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🚀 How to Use

1. Open `http://localhost:5173` in browser
2. Paste a **YouTube video URL**
3. Paste an **Instagram Reel URL**
4. Click **Analyze Videos**
5. Wait for metadata + transcript processing
6. View side-by-side video stats and comparison
7. Use the **AI Chat** to ask questions:
   - *Why did Video A perform better?*
   - *Compare the first 5-second hooks*
   - *What is the engagement rate of each video?*
   - *Suggest improvements for Video B*

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/videos/analyze` | Analyze both videos |
| POST | `/api/chat/` | Chat (non-streaming) |
| POST | `/api/chat/stream` | Chat with SSE streaming |

### Analyze Request
```json
{
  "youtube_url": "https://youtube.com/watch?v=...",
  "instagram_url": "https://instagram.com/reel/..."
}
```

### Chat Request
```json
{
  "question": "Why did Video A perform better?",
  "session_id": "default"
}
```

### Chat Response
```json
{
  "answer": "Video A performed better because...",
  "sources": [
    { "video": "A", "chunk": "3" },
    { "video": "B", "chunk": "7" }
  ]
}
```

---

##  Common Issues & Fixes

### `ModuleNotFoundError: langchain.chains`
```bash
pip install langchain langchain-community --upgrade
```

### `ModuleNotFoundError: langchain_text_splitter`
```bash
pip install langchain-text-splitters
```

### `GOOGLE_API_KEY missing`
Add your key to `backend/.env` file.

### `npm install` conflict
```bash
npm install --legacy-peer-deps
```

### FFmpeg not found (Whisper error)
Download FFmpeg from https://ffmpeg.org/download.html and add to PATH.

---

## 📊 How RAG Works

```
User Question
     ↓
Embed Question
     ↓
ChromaDB Vector Search
     ↓
Retrieve Top 6 Chunks (Video A + B)
     ↓
Build Context + Chat History
     ↓
Gemini 2.5 Flash generates Answer
     ↓
Stream Answer + Cite Sources
```

---

##  Features

- ✅ YouTube metadata + auto transcript
- ✅ Instagram Reel metadata + Whisper transcription
- ✅ Engagement rate calculation
- ✅ ChromaDB vector storage
- ✅ RAG pipeline with Gemini
- ✅ Conversational memory per session
- ✅ Streaming responses (SSE)
- ✅ Source citations (Video A/B + Chunk number)
- ✅ Side-by-side comparison with winner badge
- ✅ Responsive design (desktop + mobile)

---

##  Author

Built with FastAPI + LangChain + React + Gemini 2.5 Flash
