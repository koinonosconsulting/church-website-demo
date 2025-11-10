// src/app/api/admin/projects/[id]/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Helper: Recalculate total collected amount for a branch
 */
async function recalcBranchTotal(branchId: string | null | undefined) {
  if (!branchId) return 0; // ✅ Safe guard if null

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
 * Deletes a project — blocks deletion if it already has donations.
 * Recalculates project + branch totals as needed.
 */
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Get project info
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Check if the project has donations
    const donations = await prisma.donation.findMany({ where: { projectId: id } });

    if (donations.length > 0) {
      // Recalculate collectedAmount before returning error
      const collectedAmount = donations
        .filter((d) => d.status === "SUCCESS")
        .reduce((sum, d) => sum + d.amount, 0);

      await prisma.project.update({
        where: { id },
        data: { collectedAmount },
      });

      // Update branch total too
      await recalcBranchTotal(project.branchId); // ✅ Now safe

      return NextResponse.json(
        { error: "Cannot delete project with donations" },
        { status: 400 }
      );
    }

    // No donations — safe to delete
    await prisma.project.delete({ where: { id } });

    // Update branch total after deletion
    await recalcBranchTotal(project.branchId); // ✅ Safe

    return NextResponse.json({ deleted: true });
  } catch (err) {
    console.error("DELETE /projects error:", err);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

/**
 * PUT /api/admin/projects/[id]
 * Updates project fields and recalculates project + branch totals.
 */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();

    // Basic validation
    if (!data.title || !data.branchId) {
      return NextResponse.json(
        { error: "Title and branchId are required" },
        { status: 400 }
      );
    }

    // Update the project
    const updated = await prisma.project.update({
      where: { id: params.id },
      data: {
        title: data.title,
        branchId: data.branchId,
        targetAmount: data.targetAmount || 0,
      },
    });

    // Recalculate collectedAmount for the project
    const donations = await prisma.donation.findMany({
      where: { projectId: params.id, status: "SUCCESS" },
    });

    const collectedAmount = donations.reduce((sum, d) => sum + d.amount, 0);

    await prisma.project.update({
      where: { id: params.id },
      data: { collectedAmount },
    });

    // Recalculate branch total
    const branchTotal = await recalcBranchTotal(data.branchId);

    return NextResponse.json({ ...updated, collectedAmount, branchTotal });
  } catch (error) {
    console.error("PUT /projects error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}