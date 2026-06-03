import ThumbnailCard from "./ThumbnailCard";
import VideoStats from "./VideoStats";
import EngagementBadge from "./EngagementBadge";
import { Youtube, Instagram } from "lucide-react";

export default function VideoCard({ video, label }) {
  const isYouTube = video.source === "youtube";

  return (
    <div className="glass p-4 flex flex-col gap-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={isYouTube
            ? { background: "rgba(255,0,0,0.12)", color: "#ff4545" }
            : { background: "rgba(225,48,108,0.12)", color: "#e1306c" }}>
          {isYouTube ? <Youtube size={15} /> : <Instagram size={15} />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-mono mb-0.5" style={{ color: "var(--brand)" }}>Video {label}</p>
          <h3 className="font-display font-semibold text-sm leading-snug line-clamp-2"
            style={{ color: "var(--text-primary)" }}>
            {video.title}
          </h3>
        </div>
      </div>

      {/* Thumbnail */}
      <ThumbnailCard src={video.thumbnail_url} title={video.title} label={`Video ${label}`} />

      {/* Creator */}
      <div className="flex items-center justify-between">
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
          by <span className="font-medium" style={{ color: "var(--text-primary)" }}>{video.creator}</span>
        </span>
        <EngagementBadge rate={video.engagement_rate} />
      </div>

      {/* Stats */}
      <VideoStats video={video} />

      {/* Hashtags */}
      {video.hashtags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {video.hashtags.slice(0, 6).map((tag, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded-full font-mono"
              style={{ background: "var(--bg-3)", color: "var(--brand)" }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}