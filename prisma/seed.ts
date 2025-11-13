// prisma/seed.ts

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

async function main() {
  const hashed = await bcrypt.hash("Admin123!", 10);

  await prisma.user.upsert({
    where: { email: "pgabeojo@gmail.com" },
    update: {},
    create: {
      email: "pgabeojo@gmail.com",
      password: hashed,
      role: "SUPER_ADMIN",
      name: "Main Admin",
    },
  });

  console.log("✅ Admin user created or already exists.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });