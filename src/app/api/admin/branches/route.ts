// src/app/api/admin/branches/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Type for a branch with its donations
 */
type BranchWithDonations = {
  id: string;
  name: string;
  slug: string;
  city: string | null;
  donations: {
    status: string;
    amount: number;
  }[];
};

/**
 * GET all branches with donation stats
 */
export async function GET() {
  try {
    const branches = await prisma.branch.findMany({
      include: { donations: true },
      orderBy: { createdAt: "desc" },
    });

    const data = branches.map((b: BranchWithDonations) => ({
      id: b.id,
      name: b.name,
      slug: b.slug,
      city: b.city,
      donationsCount: b.donations.length,
      donationsTotal: b.donations
        .filter((d) => d.status === "SUCCESS")
        .reduce((sum, d) => sum + d.amount, 0),
    }));

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /branches error:", err);
    return NextResponse.json({ error: "Failed to fetch branches" }, { status: 500 });
  }
}

/**
 * POST /api/admin/branches
 * Create a new branch
 */
export async function POST(req: Request) {
  try {
    const { name, slug: inputSlug, city } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Branch name is required" }, { status: 400 });
    }

    // Auto-slugify if not provided
    const slug = inputSlug?.trim()
      ? inputSlug.trim().toLowerCase().replace(/\s+/g, "-")
      : name.trim().toLowerCase().replace(/\s+/g, "-");

    // Check slug uniqueness
    const existing = await prisma.branch.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "A branch with this slug already exists" },
        { status: 400 }
      );
    }

    const branch = await prisma.branch.create({
      data: { name: name.trim(), slug, city: city?.trim() || null },
    });

    return NextResponse.json(branch);
  } catch (err) {
    console.error("POST /branches error:", err);
    return NextResponse.json({ error: "Failed to create branch" }, { status: 500 });
  }
}