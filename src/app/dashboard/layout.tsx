"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Data Admin", href: "/dashboard/admin", icon: "🧑‍💼" },
    { name: "Data Harga & Kelas", href: "/dashboard/harga", icon: "🏷️" },
    { name: "Pemesanan Tiket", href: "/dashboard/pemesanan", icon: "🎟️" },
    { name: "Data Penumpang", href: "/dashboard/penumpang", icon: "👥" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 glass-panel m-4 flex flex-col border-r border-slate-700/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-orange-500/10 blur-2xl" />
        <div className="p-6 relative z-10">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            🚆 TiketGo
          </h2>
          <p className="text-slate-400 text-sm mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 relative z-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 relative z-10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-transparent hover:border-red-500/30"
          >
            <span>🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
