// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

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
        className="min-h-screen flex flex-col bg-gray-50 text-gray-900"
        suppressHydrationWarning
      >
        {/* Client-side only components */}
        <div suppressHydrationWarning>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </body>
    </html>
  );
}