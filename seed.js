const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = 'postgresql://postgres:Kenji890aaa.@localhost:5432/db_tiket_go?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database db_tiket_go...");

  // 1. Admin
  const adminCount = await prisma.admin.count();
  if (adminCount === 0) {
    await prisma.admin.create({
      data: {
        nama: "Super Admin",
        username: "admin",
        password: "admin"
      }
    });
    console.log("Admin seeded.");
  }

  // 2. Harga (Tiket & Kelas)
  const hargaCount = await prisma.harga.count();
  if (hargaCount === 0) {
    await prisma.harga.createMany({
      data: [
        { status: "Tersedia", kelas: "Ekonomi", harga: 50000 },
        { status: "Tersedia", kelas: "Bisnis", harga: 150000 },
        { status: "Tersedia", kelas: "VIP", harga: 300000 },
        { status: "Tersedia", kelas: "Eksekutif", harga: 500000 }
      ]
    });
    console.log("Harga/Kelas seeded.");
  }

  // 3. Penumpang Dummy
  const penumpangCount = await prisma.penumpang.count();
  if (penumpangCount === 0) {
    await prisma.penumpang.create({
      data: {
        nama: "Budi Santoso",
        alamat: "Jl. Merdeka No. 1",
        kereta: "Argo Bromo Anggrek",
        gerbong: "EKS-1",
        stasiun_awal: "Gambir",
        stasiun_tujuan: "Pasar Turi",
        jam_berangkat: "08:00",
        jam_tiba: "16:00",
        tanggal: "2026-05-26",
        dewasa: 2,
        anak: 0,
        total: 1000000
      }
    });
    console.log("Penumpang dummy seeded.");
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
