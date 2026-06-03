import { useState } from "react";
import { Youtube, Instagram, Zap } from "lucide-react";
import Loader from "../common/Loader";
import ErrorBox from "../common/ErrorBox";

export default function UrlForm({ onAnalyze, isLoading, error }) {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!youtubeUrl.trim() || !instagramUrl.trim()) return;
    onAnalyze(youtubeUrl.trim(), instagramUrl.trim());
  };

  return (
    <div className="glass p-6 animate-fade-in">
      <div className="mb-5">
        <h2 className="font-display font-semibold text-lg mb-1" style={{ color: "var(--text-primary)" }}>
          Analyze Videos
        </h2>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Paste a YouTube video URL and an Instagram Reel URL to compare them with AI.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,0,0,0.12)", color: "#ff4545" }}>
            <Youtube size={15} />
          </div>
          <input
            type="url"
            placeholder="https://youtube.com/watch?v=..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="input-dark flex-1 px-4 py-2.5 text-sm"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(225,48,108,0.12)", color: "#e1306c" }}>
            <Instagram size={15} />
          </div>
          <input
            type="url"
            placeholder="https://instagram.com/reel/..."
            value={instagramUrl}
            onChange={(e) => setInstagramUrl(e.target.value)}
            className="input-dark flex-1 px-4 py-2.5 text-sm"
            required
          />
        </div>

        {error && <ErrorBox message={error} />}

        <button
          type="submit"
          disabled={isLoading || !youtubeUrl || !instagramUrl}
          className="btn-brand w-full py-2.5 rounded-xl font-display font-semibold text-sm text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {isLoading ? (
            <Loader text="Analyzing videos..." />
          ) : (
            <>
              <Zap size={15} />
              Analyze Videos
            </>
          )}
        </button>
      </form>
    </div>
  );
}