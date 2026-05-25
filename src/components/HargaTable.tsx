"use client";

import { useState } from "react";
import { createHarga, updateHarga, deleteHarga } from "@/app/actions/harga";
import { Harga } from "@prisma/client";

export default function HargaTable({ initialData }: { initialData: Harga[] }) {
  const [data, setData] = useState<Harga[]>(initialData);
  const [formData, setFormData] = useState({ id: 0, status: "Tersedia", kelas: "", harga: 0 });
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await updateHarga(formData.id, {
        status: formData.status,
        kelas: formData.kelas,
        harga: Number(formData.harga)
      });
    } else {
      await createHarga({
        status: formData.status,
        kelas: formData.kelas,
        harga: Number(formData.harga)
      });
    }
    window.location.reload();
  };

  const handleEdit = (item: Harga) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus?")) {
      await deleteHarga(id);
      window.location.reload();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Form */}
      <div className="glass-panel p-6 h-fit">
        <h2 className="text-xl font-semibold mb-4 text-orange-400">
          {isEditing ? "Edit Harga" : "Tambah Harga"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-slate-300">Status</label>
            <select
              required
              className="glass-input w-full px-3 py-2 rounded"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Tersedia">Tersedia</option>
              <option value="Habis">Habis</option>
              <option value="Promo">Promo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-300">Kelas Kereta</label>
            <input
              type="text"
              required
              placeholder="Contoh: Eksekutif"
              className="glass-input w-full px-3 py-2 rounded"
              value={formData.kelas}
              onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-300">Harga Tiket (Rp)</label>
            <input
              type="number"
              required
              className="glass-input w-full px-3 py-2 rounded"
              value={formData.harga || ""}
              onChange={(e) => setFormData({ ...formData, harga: Number(e.target.value) })}
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="submit" className="glass-button flex-1 py-2 rounded">
              {isEditing ? "Update" : "Simpan"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="glass-button-secondary flex-1 py-2 rounded"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ id: 0, status: "Tersedia", kelas: "", harga: 0 });
                }}
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="glass-panel p-6 md:col-span-2 overflow-hidden">
        <h2 className="text-xl font-semibold mb-4 text-orange-400">Daftar Harga Kelas</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Kelas</th>
                <th>Harga</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.status === 'Tersedia' ? 'bg-green-500/20 text-green-300' :
                      item.status === 'Promo' ? 'bg-orange-500/20 text-orange-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="font-medium text-white">{item.kelas}</td>
                  <td className="text-orange-400">Rp {item.harga.toLocaleString('id-ID')}</td>
                  <td className="text-right space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded hover:bg-blue-500/40"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 bg-red-500/20 text-red-300 rounded hover:bg-red-500/40"
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
    </div>
  );
}
