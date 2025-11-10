// src/app/api/payments/checkout/route.ts
import { NextResponse } from "next/server";
import { paystack } from "@/lib/paystack";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { purpose, amount, donor, currency = "NGN", recurring = false, branchId, projectId, note } = body;

    if (!amount || !donor?.email || !branchId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 🔹 Generate unique reference for Paystack & DB
    const reference = `don_${randomBytes(8).toString("hex")}`;

    // 🔹 Create donation in DB (status: PENDING)
    const donation = await prisma.donation.create({
      data: {
        donorId: donor?.id || null,
        donorEmail: donor.email,
        donorName: donor.name,
        donorPhone: donor.phone,
        branchId,
        projectId: projectId || null,
        purpose,
        note,
        amount,
        currency,
        reference,
      },
    });

    // 🔹 Initialize Paystack transaction
    const initResponse = await paystack.post("/transaction/initialize", {
      email: donor.email,
      amount: Math.round(amount * 100), // kobo
      currency,
      reference, // must match DB
      metadata: {
        donationId: donation.id,
        donorId: donor?.id || null,
        purpose,
        recurring,
      },
    });

    const data = initResponse.data?.data;
    if (!data?.reference || !data?.authorization_url) {
      return NextResponse.json({ error: "Paystack init failed" }, { status: 400 });
    }

    return NextResponse.json({
      authorization_url: data.authorization_url,
      reference: data.reference,
      donationId: donation.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}