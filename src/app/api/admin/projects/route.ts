// src/app/api/admin/projects/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const branchId = url.searchParams.get("branchId");

    const projects = await prisma.project.findMany({
      where: branchId ? { branchId } : {},
      include: {
        branch: true,
        donations: true, // to compute collected and count
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = projects.map((p) => ({
      id: p.id,
      title: p.title,
      branchId: p.branchId,
      branchName: p.branch?.name || "-",
      targetAmount: p.targetAmount,
      collectedAmount: p.donations
        .filter((d) => d.status === "SUCCESS")
        .reduce((sum, d) => sum + d.amount, 0),
      donationsCount: p.donations.filter((d) => d.status === "SUCCESS").length,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}