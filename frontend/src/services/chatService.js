export const streamChat = async (question, sessionId = "default", callbacks = {}) => {
  const { onToken, onSources, onDone, onError } = callbacks;

  try {
    const response = await fetch("/api/chat/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, session_id: sessionId }),
    });

    if (!response.ok) {
      throw new Error(`Chat request failed: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value, { stream: true });
      const lines = text.split("\n");

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const jsonStr = line.replace("data: ", "").trim();
        if (!jsonStr) continue;

        try {
          const data = JSON.parse(jsonStr);

          if (data.type === "token" && onToken) {
            onToken(data.content);
          } else if (data.type === "sources" && onSources) {
            onSources(data.content);
          } else if (data.type === "done" && onDone) {
            onDone();
          }
        } catch {
          // skip malformed chunk
        }
      }
    }
  } catch (err) {
    if (onError) onError(err.message);
  }
};