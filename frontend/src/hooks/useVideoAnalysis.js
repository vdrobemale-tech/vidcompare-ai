import { useCallback } from "react";
import useAppStore from "../store/appStore";
import { analyzeVideos } from "../services/videoService";

export const useVideoAnalysis = () => {
  const {
    videoA, videoB, comparison,
    isAnalyzing, analyzeError,
    setAnalyzing, setAnalyzeError, setVideos,
  } = useAppStore();

  const analyze = useCallback(async (youtubeUrl, instagramUrl) => {
    setAnalyzing(true);
    setAnalyzeError(null);
    try {
      const data = await analyzeVideos(youtubeUrl, instagramUrl);
      setVideos(data.video_a, data.video_b, data.comparison);
    } catch (err) {
      setAnalyzeError(err.message);
    } finally {
      setAnalyzing(false);
    }
  }, [setAnalyzing, setAnalyzeError, setVideos]);

  return { videoA, videoB, comparison, isAnalyzing, analyzeError, analyze };
};