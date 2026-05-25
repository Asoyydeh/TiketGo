import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const totalPenumpang = await prisma.penumpang.count();
  const totalPendapatan = await prisma.penumpang.aggregate({
    _sum: {
      total: true
    }
  });

  const pendapatan = totalPendapatan._sum.total || 0;

  const ruteFavorit = await prisma.penumpang.groupBy({
    by: ['stasiun_tujuan'],
    _count: {
      id: true
    },
    orderBy: {
      _count: {
        id: 'desc'
      }
    },
    take: 3
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Ringkasan operasional TiketGo hari ini.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
          <h3 className="text-slate-400 font-medium mb-1 relative z-10">Total Penumpang</h3>
          <p className="text-4xl font-bold text-white relative z-10">{totalPenumpang}</p>
        </div>

        <div className="glass-panel p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all" />
          <h3 className="text-slate-400 font-medium mb-1 relative z-10">Total Pendapatan</h3>
          <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 relative z-10">
            Rp {pendapatan.toLocaleString('id-ID')}
          </p>
        </div>

        <div className="glass-panel p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
          <h3 className="text-slate-400 font-medium mb-1 relative z-10">Rute Terfavorit</h3>
          <p className="text-2xl font-bold text-white relative z-10">
            {ruteFavorit.length > 0 ? ruteFavorit[0].stasiun_tujuan : "Belum Ada"}
          </p>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="glass-panel p-8 relative overflow-hidden flex items-center justify-between">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl font-bold text-white mb-3">Selamat Datang di Sistem Baru! 🚀</h2>
          <p className="text-slate-300 leading-relaxed">
            Aplikasi TiketGo Anda kini telah berhasil dimigrasi dari Java Desktop lawas menjadi Web App modern.
            Silakan telusuri menu di sebelah kiri untuk mulai mengatur harga kelas kereta dan mengelola transaksi tiket penumpang.
          </p>
        </div>
        <div className="text-8xl opacity-80 mix-blend-overlay hidden md:block">
          🚄
        </div>
      </div>
    </div>
  );
}
