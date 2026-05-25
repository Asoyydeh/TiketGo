"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createHarga(data: { status: string; kelas: string; harga: number }) {
  try {
    await prisma.harga.create({ data });
    revalidatePath("/dashboard/harga");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Gagal menambah harga" };
  }
}

export async function updateHarga(id: number, data: { status: string; kelas: string; harga: number }) {
  try {
    await prisma.harga.update({ where: { id }, data });
    revalidatePath("/dashboard/harga");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Gagal mengupdate harga" };
  }
}

export async function deleteHarga(id: number) {
  try {
    await prisma.harga.delete({ where: { id } });
    revalidatePath("/dashboard/harga");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Gagal menghapus harga" };
  }
}
