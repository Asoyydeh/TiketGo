import { prisma } from "@/lib/prisma";
import PemesananForm from "@/components/PemesananForm";

export default async function PemesananPage() {
  const kelasList = await prisma.harga.findMany();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Pemesanan Tiket</h1>
        <p className="text-slate-400">Kasir pemesanan tiket kereta api untuk pelanggan.</p>
      </div>

      <PemesananForm kelasList={kelasList} />
    </div>
  );
}
