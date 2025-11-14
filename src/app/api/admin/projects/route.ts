// src/app/api/admin/projects/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Project, Donation, Branch } from "@prisma/client";

type ProjectWithRelations = Project & {
  branch: Branch | null;
  donations: Donation[];
};

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const branchId = url.searchParams.get("branchId");

    const projects: ProjectWithRelations[] = await prisma.project.findMany({
      where: { 
        ...(branchId ? { branchId } : {}),
        isActive: true // Only active projects
      },
      include: { branch: true, donations: true },
      orderBy: { createdAt: "desc" },
    });

    const formatted = projects.map((p: ProjectWithRelations) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      branchId: p.branchId,
      branchName: p.branch?.name || "-",
      targetAmount: p.targetAmount,
      collectedAmount: p.donations
        .filter((d: Donation) => d.status === "SUCCESS")
        .reduce((sum: number, d: Donation) => sum + d.amount, 0),
      donationsCount: p.donations.filter((d: Donation) => d.status === "SUCCESS").length,
      isActive: p.isActive,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("GET /projects error:", err);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}