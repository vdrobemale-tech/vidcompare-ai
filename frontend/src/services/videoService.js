import api from "./api";

export const analyzeVideos = async (youtubeUrl, instagramUrl) => {
  const response = await api.post("/videos/analyze", {
    youtube_url: youtubeUrl,
    instagram_url: instagramUrl,
  });
  return response.data;
};