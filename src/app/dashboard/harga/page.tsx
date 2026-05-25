import { prisma } from "@/lib/prisma";
import HargaTable from "@/components/HargaTable";

export default async function HargaPage() {
  const data = await prisma.harga.findMany({
    orderBy: { harga: "asc" },
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Manajemen Harga & Kelas</h1>
        <p className="text-slate-400">Atur harga tiket berdasarkan kelas layanan kereta api.</p>
      </div>

      <HargaTable initialData={data} />
    </div>
  );
}
