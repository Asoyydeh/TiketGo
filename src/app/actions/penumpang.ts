"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPenumpang(data: {
  nama: string;
  alamat: string;
  kereta: string;
  gerbong: string;
  stasiun_awal: string;
  stasiun_tujuan: string;
  jam_berangkat: string;
  jam_tiba: string;
  tanggal: string;
  dewasa: number;
  anak: number;
  total: number;
}) {
  try {
    await prisma.penumpang.create({ data });
    revalidatePath("/dashboard/pemesanan");
    revalidatePath("/dashboard/penumpang");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Gagal memproses pemesanan tiket" };
  }
}

export async function deletePenumpang(id: number) {
  try {
    await prisma.penumpang.delete({ where: { id } });
    revalidatePath("/dashboard/penumpang");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Gagal menghapus riwayat penumpang" };
  }
}
