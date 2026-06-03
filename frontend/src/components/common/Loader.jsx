export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" />
        <div className="absolute inset-1 rounded-full border-2 border-transparent border-t-indigo-400 animate-spin" style={{ animationDuration: "0.6s", animationDirection: "reverse" }} />
      </div>
      <p className="text-sm animate-pulse2" style={{ color: "var(--text-secondary)" }}>{text}</p>
    </div>
  );
}