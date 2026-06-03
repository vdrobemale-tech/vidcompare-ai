import Navbar from "../components/common/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-0)" }}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-12">
        {children}
      </main>
    </div>
  );
}