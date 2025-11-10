// src/lib/auth.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("Login attempt:", credentials);

          if (!credentials?.email || !credentials?.password) {
            console.log("Missing email or password");
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            console.log("User not found with email:", credentials.email);
            return null;
          }

          if (!user.password) {
            console.log("User has no password set");
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          console.log("Password valid?", isValid);

          if (!isValid) {
            return null;
          }

          // Success — return session object
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // login page
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});