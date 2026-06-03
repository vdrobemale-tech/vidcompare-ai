import { AlertCircle, X } from "lucide-react";

export default function ErrorBox({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-xl border animate-fade-in"
      style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.3)", color: "#f87171" }}>
      <AlertCircle size={16} className="mt-0.5 shrink-0" />
      <p className="text-sm flex-1">{message}</p>
      {onDismiss && (
        <button onClick={onDismiss} className="opacity-60 hover:opacity-100">
          <X size={14} />
        </button>
      )}
    </div>
  );
}