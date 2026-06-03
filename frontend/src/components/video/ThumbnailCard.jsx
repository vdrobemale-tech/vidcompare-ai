import { ImageOff } from "lucide-react";

export default function ThumbnailCard({ src, title, label }) {
  if (!src) {
    return (
      <div className="w-full aspect-video rounded-xl flex flex-col items-center justify-center gap-2"
        style={{ background: "var(--bg-3)", color: "var(--text-muted)" }}>
        <ImageOff size={28} />
        <span className="text-xs">No thumbnail</span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
      <img
        src={src}
        alt={title}
        className="w-full h-full object-cover"
        onError={(e) => { e.target.style.display = "none"; }}
      />
      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-display font-bold"
        style={{ background: "rgba(0,0,0,0.6)", color: "white", backdropFilter: "blur(4px)" }}>
        {label}
      </div>
    </div>
  );
}