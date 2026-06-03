import { Eye, Heart, MessageCircle, Clock, Users, Calendar } from "lucide-react";
import { formatNumber } from "../../utils/formatNumber";
import { formatDate } from "../../utils/formatDate";

const Stat = ({ icon: Icon, label, value, color = "var(--text-secondary)" }) => (
  <div className="flex items-center gap-2.5 py-2 border-b" style={{ borderColor: "var(--border)" }}>
    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
      style={{ background: "var(--bg-3)" }}>
      <Icon size={13} style={{ color }} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
      <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{value}</p>
    </div>
  </div>
);

export default function VideoStats({ video }) {
  return (
    <div className="space-y-0">
      <Stat icon={Eye} label="Views" value={formatNumber(video.views)} color="#60a5fa" />
      <Stat icon={Heart} label="Likes" value={formatNumber(video.likes)} color="#f87171" />
      <Stat icon={MessageCircle} label="Comments" value={formatNumber(video.comments)} color="#a78bfa" />
      <Stat icon={Users} label="Followers" value={formatNumber(video.follower_count)} color="#34d399" />
      <Stat icon={Clock} label="Duration" value={video.duration || "—"} />
      <Stat icon={Calendar} label="Uploaded" value={formatDate(video.upload_date)} />
    </div>
  );
}