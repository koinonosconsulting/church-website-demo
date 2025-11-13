// src/app/api/auth/[...nextauth]/route.ts

import { handlers } from "@/lib/auth";

// Correct export syntax for Next.js 14–16
export const { GET, POST } = handlers;