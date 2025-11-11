// src/app/api/admin/events/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateNextFeaturedEvent } from "@/lib/events";

/**
 * PUT /api/admin/events/[id]
 * Update event
 */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { title, slug: inputSlug, description, dateStart, dateEnd, location, capacity } = await req.json();

    const slug = inputSlug?.trim()
      ? inputSlug.trim().toLowerCase().replace(/\s+/g, "-")
      : title.trim().toLowerCase().replace(/\s+/g, "-");

    const updated = await prisma.event.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        dateStart: new Date(dateStart),
        dateEnd: dateEnd ? new Date(dateEnd) : null,
        location,
        capacity: capacity ? Number(capacity) : null,
      },
    });

    await updateNextFeaturedEvent();

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /admin/events/[id] error:", err);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/events/[id]
 */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.event.delete({ where: { id } });
    await updateNextFeaturedEvent();

    return NextResponse.json({ deleted: true });
  } catch (err) {
    console.error("DELETE /admin/events/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}