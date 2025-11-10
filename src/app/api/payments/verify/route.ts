// src/app/api/payments/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { paystack } from "@/lib/paystack";

export async function POST(req: NextRequest) {
  try {
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json({ error: "Missing reference" }, { status: 400 });
    }

    const res = await paystack.get(`/transaction/verify/${reference}`);
    const data = res.data.data;

    // Update donation status
    await prisma.donation.updateMany({
      where: { reference },
      data: {
        status: data.status === "success" ? "SUCCESS" : "FAILED",
        providerRef: data.id,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ verified: data.status === "success", data });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Verification failed" }, { status: 500 });
  }
}