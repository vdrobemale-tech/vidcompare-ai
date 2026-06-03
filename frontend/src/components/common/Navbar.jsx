import { Layers } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "var(--bg-1)", borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg btn-brand flex items-center justify-center">
            <Layers size={14} className="text-white" />
          </div>
          <span className="font-display font-semibold text-sm tracking-wide" style={{ color: "var(--text-primary)" }}>
            VidCompare <span style={{ color: "var(--brand)" }}>AI</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs px-2.5 py-1 rounded-full font-mono" style={{ background: "var(--bg-3)", color: "var(--brand)" }}>
            RAG Powered
          </span>
        </div>
      </div>
    </nav>
  );
}