import { FileText } from "lucide-react";

export default function SourceCitation({ sources = [] }) {
  if (!sources.length) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {sources.map((src, i) => (
        <div key={i}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono"
          style={{
            background: src.video === "A"
              ? "rgba(79,110,247,0.12)"
              : "rgba(225,48,108,0.12)",
            color: src.video === "A" ? "var(--brand)" : "#e1306c",
            border: `1px solid ${src.video === "A" ? "rgba(79,110,247,0.25)" : "rgba(225,48,108,0.25)"}`,
          }}>
          <FileText size={10} />
          Video {src.video} · Chunk {src.chunk}
        </div>
      ))}
    </div>
  );
}