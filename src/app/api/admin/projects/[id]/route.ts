// src/app/api/admin/projects/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Donation } from "@prisma/client"; // 👈 Import the Prisma type for best practice

// Define a type for the project select result
type ProjectAmount = { collectedAmount?: number };

/**
 * Helper: Recalculate total collected amount for a branch
 */
async function recalcBranchTotal(branchId: string | null | undefined) {
  if (!branchId) return 0;

  const projects: ProjectAmount[] = await prisma.project.findMany({
    where: { branchId },
    select: { collectedAmount: true },
  });

  // Explicitly type sum and p to satisfy TypeScript
  const branchTotal = projects.reduce((sum: number, p: ProjectAmount) => sum + (p.collectedAmount || 0), 0);

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

    // Since we are using the full Donation model from prisma, we cast the array type
    const donations: Donation[] = await prisma.donation.findMany({ where: { projectId: id } });
    
    if (donations.length > 0) {
      // Recalculate collectedAmount before returning error
      // FIX: Explicitly type 'd' in the filter function using the imported Donation type
      const collectedAmount = donations
        .filter((d: Donation) => d.status === "SUCCESS")
        .reduce((sum: number, d: { amount: number }) => sum + d.amount, 0);

      await prisma.project.update({ where: { id }, data: { collectedAmount } });
      await recalcBranchTotal(project.branchId);

      return NextResponse.json(
        { error: "Cannot delete project with donations" },
        { status: 400 }
      );
    }

    // No donations — safe to delete
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
 * Updates project fields and recalculates project + branch totals.
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

    // Since we are finding by status, we can't rely on the initial Donation type from prisma.
    // We explicitly define the required shape of the found donations for type safety.
    const donations: { amount: number }[] = await prisma.donation.findMany({
      where: { projectId: id, status: "SUCCESS" },
      select: { amount: true } // Select only the required field
    });

    // Explicitly type sum and d
    const collectedAmount = donations.reduce(
      (sum: number, d: { amount: number }) => sum + d.amount,
      0
    );

    await prisma.project.update({ where: { id }, data: { collectedAmount } });
    const branchTotal = await recalcBranchTotal(data.branchId);

    return NextResponse.json({ ...updated, collectedAmount, branchTotal });
  } catch (error) {
    console.error("PUT /projects error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}