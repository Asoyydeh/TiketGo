import { prisma } from "@/lib/prisma";
import PenumpangTable from "@/components/PenumpangTable";

export default async function PenumpangPage() {
  const data = await prisma.penumpang.findMany({
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Data Penumpang</h1>
        <p className="text-slate-400">Riwayat transaksi dan manifest penumpang kereta api.</p>
      </div>

      <PenumpangTable data={data} />
    </div>
  );
}
