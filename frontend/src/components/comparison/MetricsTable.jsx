import { formatNumber } from "../../utils/formatNumber";

const Row = ({ label, valA, valB, winner }) => {
  const aWins = winner === "A";
  const bWins = winner === "B";

  return (
    <tr className="border-b" style={{ borderColor: "var(--border)" }}>
      <td className="py-2.5 px-3 text-xs" style={{ color: "var(--text-muted)" }}>{label}</td>
      <td className={`py-2.5 px-3 text-sm text-center font-mono font-medium ${aWins ? "text-emerald-400" : ""}`}
        style={!aWins ? { color: "var(--text-secondary)" } : {}}>
        {valA}
        {aWins && <span className="ml-1 text-xs">↑</span>}
      </td>
      <td className={`py-2.5 px-3 text-sm text-center font-mono font-medium ${bWins ? "text-emerald-400" : ""}`}
        style={!bWins ? { color: "var(--text-secondary)" } : {}}>
        {valB}
        {bWins && <span className="ml-1 text-xs">↑</span>}
      </td>
    </tr>
  );
};

export default function MetricsTable({ videoA, videoB, comparison }) {
  const w = comparison || {};

  return (
    <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border)" }}>
      <table className="w-full text-left">
        <thead>
          <tr style={{ background: "var(--bg-3)" }}>
            <th className="py-2.5 px-3 text-xs font-display font-semibold" style={{ color: "var(--text-muted)" }}>Metric</th>
            <th className="py-2.5 px-3 text-xs font-display font-semibold text-center" style={{ color: "var(--brand)" }}>Video A</th>
            <th className="py-2.5 px-3 text-xs font-display font-semibold text-center" style={{ color: "#e1306c" }}>Video B</th>
          </tr>
        </thead>
        <tbody style={{ background: "var(--bg-2)" }}>
          <Row label="Views" valA={formatNumber(videoA.views)} valB={formatNumber(videoB.views)} winner={w.views_winner} />
          <Row label="Likes" valA={formatNumber(videoA.likes)} valB={formatNumber(videoB.likes)} winner={w.likes_winner} />
          <Row label="Comments" valA={formatNumber(videoA.comments)} valB={formatNumber(videoB.comments)} />
          <Row label="Followers" valA={formatNumber(videoA.follower_count)} valB={formatNumber(videoB.follower_count)} />
          <Row
            label="Engagement Rate"
            valA={`${parseFloat(videoA.engagement_rate).toFixed(2)}%`}
            valB={`${parseFloat(videoB.engagement_rate).toFixed(2)}%`}
            winner={w.engagement_winner}
          />
          <Row label="Duration" valA={videoA.duration} valB={videoB.duration} />
          <Row label="Creator" valA={videoA.creator} valB={videoB.creator} />
        </tbody>
      </table>
    </div>
  );
}