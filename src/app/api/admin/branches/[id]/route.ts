// src/app/api/admin/branches/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * PUT /api/admin/branches/[id]
 * Updates branch fields safely.
 */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // <-- await the Promise

    const { name, slug: inputSlug, city } = await req.json();

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Branch name is required" }, { status: 400 });
    }

    // Auto-slugify if not provided
    const slug = inputSlug?.trim()
      ? inputSlug.trim().toLowerCase().replace(/\s+/g, "-")
      : name.trim().toLowerCase().replace(/\s+/g, "-");

    // Check slug uniqueness (ignore current branch)
    const existing = await prisma.branch.findFirst({
      where: { slug, NOT: { id } },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A branch with this slug already exists" },
        { status: 400 }
      );
    }

    const updated = await prisma.branch.update({
      where: { id },
      data: {
        name: name.trim(),
        slug,
        city: city?.trim() || null,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /branches error:", err);
    return NextResponse.json({ error: "Failed to update branch" }, { status: 500 });
  }
}