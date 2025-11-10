// src/app/api/admin/donations/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/admin/donations
 * Optional query params:
 *   ?status=SUCCESS|PENDING|FAILED
 *   ?search=string (donor name/email, branch, project, purpose)
 *   ?page=number (pagination)
 *   ?limit=number (number per page)
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status") as "SUCCESS" | "PENDING" | "FAILED" | null;
    const search = url.searchParams.get("search") || "";
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) where.status = status;

    if (search) {
      where.OR = [
        { donorName: { contains: search, mode: "insensitive" } },
        { donorEmail: { contains: search, mode: "insensitive" } },
        { purpose: { contains: search, mode: "insensitive" } },
        { branch: { name: { contains: search, mode: "insensitive" } } },
        { project: { title: { contains: search, mode: "insensitive" } } },
      ];
    }

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        include: { branch: true, project: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.donation.count({ where }),
    ]);

    return NextResponse.json({ donations, total, page, limit });
  } catch (err) {
    console.error("GET /donations error:", err);
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
  }
}