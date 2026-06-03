import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSend, isLoading }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim() || isLoading) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <textarea
        rows={1}
        placeholder="Ask about the videos..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className="input-dark flex-1 px-4 py-3 text-sm resize-none leading-relaxed disabled:opacity-50"
        style={{ minHeight: "44px", maxHeight: "120px" }}
      />
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="btn-brand w-11 h-11 rounded-xl flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        <Send size={15} className="text-white" />
      </button>
    </form>
  );
}