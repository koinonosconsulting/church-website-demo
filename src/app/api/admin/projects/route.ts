// src/app/api/admin/projects/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client"; // 👈 New import for type utilities

// 1. Define the exact payload/schema returned by the query (Project + Branch + Donations)
const projectWithRelations = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  include: {
    branch: true,
    donations: true,
  },
});

type ProjectPayload = Prisma.ProjectGetPayload<typeof projectWithRelations>;


export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const branchId = url.searchParams.get("branchId");

    // 2. The result of this query is now correctly typed as ProjectPayload[]
    const projects: ProjectPayload[] = await prisma.project.findMany({
      where: branchId ? { branchId } : {},
      include: {
        branch: true,
        donations: true, // to compute collected and count
      },
      orderBy: { createdAt: "desc" },
    });

    // 3. Apply the type to the map callback 'p'
    const formatted = projects.map((p: ProjectPayload) => ({
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