"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAdmin(data: { nama: string; username: string; password: string }) {
  try {
    await prisma.admin.create({ data });
    revalidatePath("/dashboard/admin");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Gagal menambah admin" };
  }
}

export async function updateAdmin(id: number, data: { nama: string; username: string; password: string }) {
  try {
    await prisma.admin.update({ where: { id }, data });
    revalidatePath("/dashboard/admin");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Gagal mengupdate admin" };
  }
}

export async function deleteAdmin(id: number) {
  try {
    await prisma.admin.delete({ where: { id } });
    revalidatePath("/dashboard/admin");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Gagal menghapus admin" };
  }
}
