// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "@/providers/SessionProvider";

export const metadata: Metadata = {
  title: "Lightline Church - Following the Light. Changing the World.",
  description: "Welcome to Lightline Church - A vibrant community walking in the light of Christ, dedicated to spreading hope, love, and transformation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className="min-h-screen bg-gray-50 text-gray-900"
        suppressHydrationWarning
      >
        <SessionProvider>
          {children}
        </SessionProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}