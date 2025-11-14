// src/hooks/useSession.ts
import { useSession as useNextAuthSession } from "next-auth/react";

export function useSession() {
  const { data: session, status, update } = useNextAuthSession();
  
  return {
    session: session as {
      user: {
        id: string;
        role: string;
        name?: string | null;
        email?: string | null;
      };
    } | null,
    status,
    update,
  };
}