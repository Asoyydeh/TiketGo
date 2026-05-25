"use client";

import { deletePenumpang } from "@/app/actions/penumpang";
import { Penumpang } from "@prisma/client";

export default function PenumpangTable({ data }: { data: Penumpang[] }) {
  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus riwayat pemesanan ini?")) {
      await deletePenumpang(id);
    }
  };

  return (
    <div className="glass-panel p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-orange-400">Riwayat Penumpang</h2>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tgl Keberangkatan</th>
              <th>Nama / Kontak</th>
              <th>Kereta</th>
              <th>Rute</th>
              <th>Total (Rp)</th>
              <th className="text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-slate-400">Belum ada data penumpang.</td>
              </tr>
            ) : data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <span className="text-white block">{item.tanggal}</span>
                  <span className="text-xs text-slate-400">{item.jam_berangkat} - {item.jam_tiba}</span>
                </td>
                <td>
                  <span className="font-medium text-white block">{item.nama}</span>
                  <span className="text-xs text-slate-400">Dewasa: {item.dewasa}, Anak: {item.anak}</span>
                </td>
                <td>
                  <span className="text-orange-300 block">{item.kereta}</span>
                  <span className="text-xs text-slate-400">Gerbong: {item.gerbong}</span>
                </td>
                <td>
                  {item.stasiun_awal} <span className="text-orange-500">→</span> {item.stasiun_tujuan}
                </td>
                <td className="text-emerald-400 font-medium">
                  {item.total.toLocaleString('id-ID')}
                </td>
                <td className="text-right">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-500/20 text-red-300 rounded hover:bg-red-500/40 text-sm"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
