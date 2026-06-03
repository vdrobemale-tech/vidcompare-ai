import { TrendingUp } from "lucide-react";

export default function EngagementBadge({ rate }) {
  const rateNum = parseFloat(rate);
  const color = rateNum >= 5 ? "#22d3a5" : rateNum >= 2 ? "#f59e0b" : "#94a3b8";
  const bg = rateNum >= 5 ? "rgba(34,211,165,0.1)" : rateNum >= 2 ? "rgba(245,158,11,0.1)" : "rgba(148,163,184,0.1)";

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium"
      style={{ background: bg, color }}>
      <TrendingUp size={11} />
      {rateNum.toFixed(2)}% Engagement
    </div>
  );
}