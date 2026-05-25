"use client";

import { useState } from "react";
import { createAdmin, updateAdmin, deleteAdmin } from "@/app/actions/admin";
import { Admin } from "@prisma/client";

export default function AdminTable({ initialData }: { initialData: Admin[] }) {
  const [data, setData] = useState<Admin[]>(initialData);
  const [formData, setFormData] = useState({ id: 0, nama: "", username: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await updateAdmin(formData.id, {
        nama: formData.nama,
        username: formData.username,
        password: formData.password
      });
    } else {
      await createAdmin({
        nama: formData.nama,
        username: formData.username,
        password: formData.password
      });
    }
    // Refresh page implicitly via Next.js Server Actions revalidatePath
    window.location.reload();
  };

  const handleEdit = (admin: Admin) => {
    setFormData(admin);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus?")) {
      await deleteAdmin(id);
      window.location.reload();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Form */}
      <div className="glass-panel p-6">
        <h2 className="text-xl font-semibold mb-4 text-orange-400">
          {isEditing ? "Edit Admin" : "Tambah Admin"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-slate-300">Nama Lengkap</label>
            <input
              type="text"
              required
              className="glass-input w-full px-3 py-2 rounded"
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-300">Username</label>
            <input
              type="text"
              required
              className="glass-input w-full px-3 py-2 rounded"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-300">Password</label>
            <input
              type="password"
              required={!isEditing}
              className="glass-input w-full px-3 py-2 rounded"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                  setFormData({ id: 0, nama: "", username: "", password: "" });
                }}
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="glass-panel p-6 md:col-span-2">
        <h2 className="text-xl font-semibold mb-4 text-orange-400">Daftar Admin</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Username</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.id}</td>
                  <td>{admin.nama}</td>
                  <td>{admin.username}</td>
                  <td className="text-right space-x-2">
                    <button
                      onClick={() => handleEdit(admin)}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded hover:bg-blue-500/40"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(admin.id)}
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
