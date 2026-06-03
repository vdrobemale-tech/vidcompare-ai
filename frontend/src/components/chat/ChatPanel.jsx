import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useChat } from "../../hooks/useChat";
import { MessageSquare, Sparkles } from "lucide-react";

const SUGGESTED = [
  "Why did Video A perform better?",
  "Compare the first 5-second hooks",
  "Suggest improvements for Video B",
  "What is the engagement rate of each video?",
];

export default function ChatPanel() {
  const { messages, isChatLoading, sendMessage } = useChat();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="glass flex flex-col animate-slide-up" style={{ height: "640px" }}>
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b shrink-0"
        style={{ borderColor: "var(--border)" }}>
        <div className="w-8 h-8 rounded-lg btn-brand flex items-center justify-center">
          <Sparkles size={14} className="text-white" />
        </div>
        <div>
          <h2 className="font-display font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
            AI Chat
          </h2>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            RAG-powered · Sources cited
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-5 text-center px-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: "var(--bg-3)" }}>
              <MessageSquare size={22} style={{ color: "var(--text-muted)" }} />
            </div>
            <div>
              <p className="font-display font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                Ask anything about the videos
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                The AI has read both transcripts and metadata.
              </p>
            </div>

            {/* Suggested questions */}
            <div className="w-full space-y-2">
              {SUGGESTED.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs border transition-all hover:border-blue-500/40 hover:bg-blue-500/5"
                  style={{
                    background: "var(--bg-3)",
                    borderColor: "var(--border)",
                    color: "var(--text-secondary)",
                  }}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested chips after messages exist */}
      {messages.length > 0 && (
        <div className="px-4 py-2 border-t flex flex-wrap gap-1.5 shrink-0"
          style={{ borderColor: "var(--border)" }}>
          {SUGGESTED.map((q, i) => (
            <button
              key={i}
              onClick={() => sendMessage(q)}
              disabled={isChatLoading}
              className="text-xs px-3 py-1.5 rounded-full border transition-all hover:border-blue-500/40 disabled:opacity-40"
              style={{
                background: "var(--bg-3)",
                borderColor: "var(--border)",
                color: "var(--text-muted)",
              }}>
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-4 pt-2 shrink-0">
        <ChatInput onSend={sendMessage} isLoading={isChatLoading} />
      </div>
    </div>
  );
}