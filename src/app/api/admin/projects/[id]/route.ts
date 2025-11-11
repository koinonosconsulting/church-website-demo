// src/app/api/admin/projects/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Helper: Recalculate total collected amount for a branch
 */
async function recalcBranchTotal(branchId: string | null | undefined) {
  if (!branchId) return 0;

  const projects = await prisma.project.findMany({
    where: { branchId },
    select: { collectedAmount: true },
  });

  const branchTotal = projects.reduce((sum, p) => sum + (p.collectedAmount || 0), 0);

  await prisma.branch.update({
    where: { id: branchId },
    data: { collectedAmount: branchTotal },
  });

  return branchTotal;
}

/**
 * DELETE /api/admin/projects/[id]
 */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const donations = await prisma.donation.findMany({ where: { projectId: id } });
    if (donations.length > 0) {
      const collectedAmount = donations
        .filter((d) => d.status === "SUCCESS")
        .reduce((sum, d) => sum + d.amount, 0);

      await prisma.project.update({ where: { id }, data: { collectedAmount } });
      await recalcBranchTotal(project.branchId);

      return NextResponse.json(
        { error: "Cannot delete project with donations" },
        { status: 400 }
      );
    }

    await prisma.project.delete({ where: { id } });
    await recalcBranchTotal(project.branchId);

    return NextResponse.json({ deleted: true });
  } catch (err) {
    console.error("DELETE /projects error:", err);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

/**
 * PUT /api/admin/projects/[id]
 */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const data = await req.json();

    if (!data.title || !data.branchId) {
      return NextResponse.json(
        { error: "Title and branchId are required" },
        { status: 400 }
      );
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        branchId: data.branchId,
        targetAmount: data.targetAmount || 0,
      },
    });

    const donations = await prisma.donation.findMany({
      where: { projectId: id, status: "SUCCESS" },
    });

    const collectedAmount = donations.reduce((sum, d) => sum + d.amount, 0);

    await prisma.project.update({ where: { id }, data: { collectedAmount } });
    const branchTotal = await recalcBranchTotal(data.branchId);

    return NextResponse.json({ ...updated, collectedAmount, branchTotal });
  } catch (error) {
    console.error("PUT /projects error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}