"use client";

import { useState } from "react";
import { createPenumpang } from "@/app/actions/penumpang";
import { Harga } from "@prisma/client";

export default function PemesananForm({ kelasList }: { kelasList: Harga[] }) {
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    kereta: "",
    kelasId: "", // To reference selected class
    gerbong: "EKS-1",
    stasiun_awal: "Gambir (GMR)",
    stasiun_tujuan: "Bandung (BD)",
    jam_berangkat: "08:00",
    jam_tiba: "11:00",
    tanggal: new Date().toISOString().split("T")[0],
    dewasa: 1,
    anak: 0,
  });

  const [loading, setLoading] = useState(false);

  // Calculate total based on selected class
  const selectedKelas = kelasList.find(k => k.id.toString() === formData.kelasId);
  const hargaDewasa = selectedKelas ? selectedKelas.harga : 0;
  const hargaAnak = selectedKelas ? selectedKelas.harga * 0.5 : 0; // Anak = 50%
  const totalHarga = (formData.dewasa * hargaDewasa) + (formData.anak * hargaAnak);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKelas) return alert("Pilih kelas kereta terlebih dahulu!");
    
    setLoading(true);
    const res = await createPenumpang({
      nama: formData.nama,
      alamat: formData.alamat,
      kereta: formData.kereta,
      gerbong: formData.gerbong,
      stasiun_awal: formData.stasiun_awal,
      stasiun_tujuan: formData.stasiun_tujuan,
      jam_berangkat: formData.jam_berangkat,
      jam_tiba: formData.jam_tiba,
      tanggal: formData.tanggal,
      dewasa: Number(formData.dewasa),
      anak: Number(formData.anak),
      total: totalHarga
    });

    setLoading(false);
    if (res.success) {
      alert("Pemesanan tiket berhasil!");
      window.location.href = "/dashboard/penumpang";
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="glass-panel p-8 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identitas Pemesan */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-orange-400 border-b border-orange-500/20 pb-2">Identitas Pemesan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-slate-300">Nama Lengkap</label>
              <input type="text" required className="glass-input w-full px-3 py-2 rounded" 
                value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Alamat</label>
              <input type="text" required className="glass-input w-full px-3 py-2 rounded"
                value={formData.alamat} onChange={(e) => setFormData({...formData, alamat: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Data Kereta */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-orange-400 border-b border-orange-500/20 pb-2">Data Perjalanan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1 text-slate-300">Nama Kereta</label>
              <input type="text" required placeholder="Contoh: Argo Parahyangan" className="glass-input w-full px-3 py-2 rounded"
                value={formData.kereta} onChange={(e) => setFormData({...formData, kereta: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Pilih Kelas</label>
              <select required className="glass-input w-full px-3 py-2 rounded"
                value={formData.kelasId} onChange={(e) => setFormData({...formData, kelasId: e.target.value})}>
                <option value="" disabled>-- Pilih Kelas --</option>
                {kelasList.filter(k => k.status !== 'Habis').map((k) => (
                  <option key={k.id} value={k.id}>{k.kelas} - Rp {k.harga.toLocaleString('id-ID')}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Gerbong</label>
              <input type="text" required className="glass-input w-full px-3 py-2 rounded"
                value={formData.gerbong} onChange={(e) => setFormData({...formData, gerbong: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm mb-1 text-slate-300">Stasiun Asal</label>
              <input type="text" required className="glass-input w-full px-3 py-2 rounded"
                value={formData.stasiun_awal} onChange={(e) => setFormData({...formData, stasiun_awal: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Stasiun Tujuan</label>
              <input type="text" required className="glass-input w-full px-3 py-2 rounded"
                value={formData.stasiun_tujuan} onChange={(e) => setFormData({...formData, stasiun_tujuan: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Jam Berangkat</label>
              <input type="time" required className="glass-input w-full px-3 py-2 rounded"
                value={formData.jam_berangkat} onChange={(e) => setFormData({...formData, jam_berangkat: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Jam Tiba</label>
              <input type="time" required className="glass-input w-full px-3 py-2 rounded"
                value={formData.jam_tiba} onChange={(e) => setFormData({...formData, jam_tiba: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Jumlah Tiket */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-orange-400 border-b border-orange-500/20 pb-2">Pembayaran</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1 text-slate-300">Tanggal Keberangkatan</label>
              <input type="date" required className="glass-input w-full px-3 py-2 rounded"
                value={formData.tanggal} onChange={(e) => setFormData({...formData, tanggal: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Penumpang Dewasa</label>
              <input type="number" min="1" required className="glass-input w-full px-3 py-2 rounded"
                value={formData.dewasa} onChange={(e) => setFormData({...formData, dewasa: Number(e.target.value)})} />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Penumpang Anak</label>
              <input type="number" min="0" required className="glass-input w-full px-3 py-2 rounded"
                value={formData.anak} onChange={(e) => setFormData({...formData, anak: Number(e.target.value)})} />
            </div>
          </div>
        </div>

        <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-slate-300 text-sm">Total Pembayaran</p>
            <p className="text-3xl font-bold text-white">Rp {totalHarga.toLocaleString('id-ID')}</p>
          </div>
          <button type="submit" disabled={loading} className="glass-button px-8 py-4 rounded-lg font-bold text-lg disabled:opacity-50">
            {loading ? "Memproses..." : "Proses Tiket"}
          </button>
        </div>
      </form>
    </div>
  );
}
