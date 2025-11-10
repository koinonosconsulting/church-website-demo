// src/app/api/admin/events/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateNextFeaturedEvent } from "@/lib/events";

/**
 * GET all events
 */
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { dateStart: "asc" },
    });
    return NextResponse.json(events);
  } catch (err) {
    console.error("GET /admin/events error:", err);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

/**
 * POST /api/admin/events
 * Create new event
 */
export async function POST(req: Request) {
  try {
    const { title, slug: inputSlug, description, dateStart, dateEnd, location, capacity } = await req.json();
    if (!title || !dateStart) {
      return NextResponse.json({ error: "Title and start date are required" }, { status: 400 });
    }

    // Auto-slugify if not provided
    const slug = inputSlug?.trim()
      ? inputSlug.trim().toLowerCase().replace(/\s+/g, "-")
      : title.trim().toLowerCase().replace(/\s+/g, "-");

    // Ensure slug is unique
    const existing = await prisma.event.findUnique({ where: { slug } });
    if (existing) return NextResponse.json({ error: "Slug already exists" }, { status: 400 });

    const event = await prisma.event.create({
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

    // ✅ Automatically update featured event
    await updateNextFeaturedEvent();

    return NextResponse.json(event);
  } catch (err) {
    console.error("POST /admin/events error:", err);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}