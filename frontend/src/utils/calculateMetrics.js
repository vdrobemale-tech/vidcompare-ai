export const calculateEngagementRate = (likes, comments, views) => {
  if (!views || views === 0) return "0.00%";
  const rate = ((likes + comments) / views) * 100;
  return rate.toFixed(2) + "%";
};

export const getWinnerLabel = (valA, valB) => {
  if (valA > valB) return "A";
  if (valB > valA) return "B";
  return "tie";
};