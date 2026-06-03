import { Lightbulb } from "lucide-react";

export default function InsightsCard({ insights = [] }) {
  if (!insights.length) return null;

  return (
    <div className="rounded-xl p-4 border"
      style={{ background: "rgba(79,110,247,0.06)", borderColor: "rgba(79,110,247,0.2)" }}>
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={14} style={{ color: "var(--brand)" }} />
        <p className="text-xs font-display font-semibold tracking-wide uppercase"
          style={{ color: "var(--brand)" }}>Quick Insights</p>
      </div>
      <ul className="space-y-2">
        {insights.map((insight, i) => (
          <li key={i} className="flex items-start gap-2 text-sm"
            style={{ color: "var(--text-secondary)" }}>
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: "var(--brand)" }} />
            {insight}
          </li>
        ))}
      </ul>
    </div>
  );
}