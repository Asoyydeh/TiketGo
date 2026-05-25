"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function login(username: string, password: string) {
  // Hardcode default admin if db is empty
  const count = await prisma.admin.count();
  if (count === 0 && username === "admin" && password === "admin") {
    await prisma.admin.create({
      data: {
        nama: "Super Admin",
        username: "admin",
        password: "admin"
      }
    });
  }

  const user = await prisma.admin.findUnique({
    where: { username }
  });

  if (!user) {
    return { success: false, message: "Username tidak ditemukan!" };
  }

  if (user.password !== password) {
    return { success: false, message: "Password salah!" };
  }

  // Set cookie for simple auth
  cookies().set("tiketgo_auth", user.id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 // 1 day
  });

  return { success: true, message: "Berhasil login!" };
}

export async function logout() {
  cookies().delete("tiketgo_auth");
  return { success: true };
}
