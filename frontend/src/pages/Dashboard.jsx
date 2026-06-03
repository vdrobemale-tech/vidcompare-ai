import UrlForm from "../components/url-input/UrlForm";
import VideoCard from "../components/video/VideoCard";
import ComparisonPanel from "../components/comparison/ComparisonPanel";
import ChatPanel from "../components/chat/ChatPanel";
import { useVideoAnalysis } from "../hooks/useVideoAnalysis";

export default function Dashboard() {
  const { videoA, videoB, comparison, isAnalyzing, analyzeError, analyze } = useVideoAnalysis();

  const hasVideos = videoA && videoB;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="text-center py-8 animate-fade-in">
        <h1 className="font-display font-bold text-3xl sm:text-4xl mb-3 leading-tight"
          style={{ color: "var(--text-primary)" }}>
          Compare Videos with{" "}
          <span style={{
            background: "linear-gradient(135deg, #4f6ef7, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            AI Intelligence
          </span>
        </h1>
        <p className="text-sm max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
          Analyze YouTube vs Instagram Reels — transcripts, metadata, engagement, and AI-powered insights.
        </p>
      </div>

      {/* URL Input */}
      <UrlForm
        onAnalyze={analyze}
        isLoading={isAnalyzing}
        error={analyzeError}
      />

      {/* Video Cards */}
      {hasVideos && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <VideoCard video={videoA} label="A" />
          <VideoCard video={videoB} label="B" />
        </div>
      )}

      {/* Comparison */}
      {hasVideos && comparison && (
        <ComparisonPanel
          videoA={videoA}
          videoB={videoB}
          comparison={comparison}
        />
      )}

      {/* Chat */}
      {hasVideos && (
        <ChatPanel />
      )}

      {/* Empty state */}
      {!hasVideos && !isAnalyzing && (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}>
            <span className="text-2xl">🎬</span>
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Paste URLs above to start comparing
          </p>
        </div>
      )}
    </div>
  );
}