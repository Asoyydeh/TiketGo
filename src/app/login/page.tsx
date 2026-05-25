"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await login(username, password);
    if (res.success) {
      router.push("/dashboard");
    } else {
      setError(res.message || "Gagal login!");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      {/* Background illustration / blurred circles for glassmorphism */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="glass-panel w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-2">
            TiketGo
          </h1>
          <p className="text-slate-300">Sistem Manajemen Kereta Api</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
            <input
              type="text"
              required
              className="glass-input w-full px-4 py-3 rounded-lg"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input
              type="password"
              required
              className="glass-input w-full px-4 py-3 rounded-lg"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="glass-button w-full py-3 px-4 rounded-lg font-medium text-lg mt-4 disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk ke Sistem"}
          </button>
        </form>
      </div>
    </div>
  );
}
