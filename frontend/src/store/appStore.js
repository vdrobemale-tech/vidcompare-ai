import { create } from "zustand";

const useAppStore = create((set) => ({
  // Video data
  videoA: null,
  videoB: null,
  comparison: null,
  isAnalyzing: false,
  analyzeError: null,

  // Chat
  messages: [],
  isChatLoading: false,
  chatError: null,

  // Actions
  setAnalyzing: (val) => set({ isAnalyzing: val }),
  setAnalyzeError: (err) => set({ analyzeError: err }),

  setVideos: (videoA, videoB, comparison) =>
    set({ videoA, videoB, comparison, analyzeError: null }),

  clearVideos: () =>
    set({ videoA: null, videoB: null, comparison: null, messages: [] }),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  updateLastMessage: (updater) =>
    set((state) => {
      const msgs = [...state.messages];
      if (msgs.length === 0) return state;
      msgs[msgs.length - 1] = updater(msgs[msgs.length - 1]);
      return { messages: msgs };
    }),

  setChatLoading: (val) => set({ isChatLoading: val }),
  setChatError: (err) => set({ chatError: err }),

  clearChat: () => set({ messages: [], chatError: null }),
}));

export default useAppStore;