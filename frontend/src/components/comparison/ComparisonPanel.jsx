import { Trophy } from "lucide-react";
import MetricsTable from "./MetricsTable";
import InsightsCard from "./InsightsCard";

export default function ComparisonPanel({ videoA, videoB, comparison }) {
  const winner = comparison?.engagement_winner;

  return (
    <div className="glass p-5 flex flex-col gap-5 animate-slide-up">
      {/* Title Row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display font-semibold text-base" style={{ color: "var(--text-primary)" }}>
            Comparison
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Side-by-side metrics breakdown
          </p>
        </div>

        {/* Engagement Winner Badge */}
        {winner && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(250,204,21,0.1)", border: "1px solid rgba(250,204,21,0.25)" }}>
            <Trophy size={13} style={{ color: "#facc15" }} />
            <span className="text-xs font-display font-semibold" style={{ color: "#facc15" }}>
              Video {winner} wins engagement
            </span>
          </div>
        )}
      </div>

      {/* Metrics Table */}
      <MetricsTable videoA={videoA} videoB={videoB} comparison={comparison} />

      {/* Insights */}
      <InsightsCard insights={comparison?.insights || []} />
    </div>
  );
}