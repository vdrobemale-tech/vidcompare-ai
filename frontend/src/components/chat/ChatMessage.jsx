import ReactMarkdown from "react-markdown";
import SourceCitation from "./SourceCitation";
import StreamingMessage from "./StreamingMessage";
import { Bot, User } from "lucide-react";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 animate-fade-in ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5"
        style={isUser
          ? { background: "var(--brand)", color: "white" }
          : { background: "var(--bg-3)", color: "var(--text-secondary)" }}>
        {isUser ? <User size={13} /> : <Bot size={13} />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${isUser ? "rounded-tr-sm" : "rounded-tl-sm"}`}
        style={isUser
          ? { background: "var(--brand)", color: "white" }
          : { background: "var(--bg-3)", color: "var(--text-primary)" }}>

        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : (
          <div className="text-sm leading-relaxed markdown">
            <ReactMarkdown>{message.content || " "}</ReactMarkdown>
            {message.streaming && <StreamingMessage />}
          </div>
        )}

        {/* Sources */}
        {!isUser && message.sources?.length > 0 && (
          <SourceCitation sources={message.sources} />
        )}
      </div>
    </div>
  );
}