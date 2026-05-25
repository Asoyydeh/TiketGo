import { prisma } from "@/lib/prisma";
import AdminTable from "@/components/AdminTable";

export default async function AdminPage() {
  const data = await prisma.admin.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Manajemen Admin</h1>
        <p className="text-slate-400">Kelola data pengguna sistem TiketGo.</p>
      </div>

      <AdminTable initialData={data} />
    </div>
  );
}
