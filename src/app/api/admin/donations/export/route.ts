// src/app/api/admin/donations/export/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const donations = await prisma.donation.findMany({
      orderBy: { createdAt: "desc" },
      include: { branch: true, project: true },
    });

    return NextResponse.json(donations);
  } catch (err) {
    console.error("GET /donations/export error:", err);
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
  }
}