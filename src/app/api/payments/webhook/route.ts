// src/app/api/payments/webhook/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    // 🔒 Verify signature
    if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

    const hash = crypto.createHmac("sha512", PAYSTACK_SECRET).update(rawBody).digest("hex");
    if (hash !== signature) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });

    const event = JSON.parse(rawBody);
    const { event: eventType, data } = event;

    if (eventType === "charge.success") {
      const donationId = data.metadata?.donationId;
      if (!donationId) return NextResponse.json({ error: "Missing donationId in metadata" }, { status: 400 });

      // ✅ Update donation status (idempotent)
      await prisma.donation.updateMany({
        where: { id: donationId, status: "PENDING" },
        data: {
          status: "SUCCESS",
          authorizationCode: data.authorization?.authorization_code || null,
          providerRef: data.id?.toString() || null,
          meta: data, // store full Paystack payload
          updatedAt: new Date(),
        },
      });

      console.log(`✅ Donation verified and updated: ${donationId}`);
      // TODO: Trigger email receipt / branch notification
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}