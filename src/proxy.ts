// src/proxy.ts
import { auth } from "@/lib/auth";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  return auth(req);
}

export const config = {
  matcher: ["/admin/:path*"],
};