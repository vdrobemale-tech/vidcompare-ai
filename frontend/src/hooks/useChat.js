import { useCallback } from "react";
import useAppStore from "../store/appStore";
import { streamChat } from "../services/chatService";

export const useChat = () => {
  const {
    messages, isChatLoading, chatError,
    addMessage, updateLastMessage,
    setChatLoading, setChatError,
  } = useAppStore();

  const sendMessage = useCallback(async (question) => {
    if (!question.trim() || isChatLoading) return;

    // Add user message
    addMessage({ role: "user", content: question });

    // Add empty assistant message to stream into
    addMessage({ role: "assistant", content: "", sources: [], streaming: true });

    setChatLoading(true);
    setChatError(null);

    await streamChat(question, "default", {
      onToken: (token) => {
        updateLastMessage((msg) => ({
          ...msg,
          content: msg.content + token,
        }));
      },
      onSources: (sources) => {
        updateLastMessage((msg) => ({ ...msg, sources }));
      },
      onDone: () => {
        updateLastMessage((msg) => ({ ...msg, streaming: false }));
        setChatLoading(false);
      },
      onError: (err) => {
        updateLastMessage((msg) => ({
          ...msg,
          content: "Sorry, something went wrong. Please try again.",
          streaming: false,
        }));
        setChatError(err);
        setChatLoading(false);
      },
    });
  }, [isChatLoading, addMessage, updateLastMessage, setChatLoading, setChatError]);

  return { messages, isChatLoading, chatError, sendMessage };
};