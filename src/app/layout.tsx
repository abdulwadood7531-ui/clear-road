import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClearRoad – AI Career Roadmap Wizard",
  description: "ClearRoad turns your vague career goals into a concrete, phase-by-phase roadmap powered by AI.",
  openGraph: {
    title: "ClearRoad – AI Career Roadmaps",
    description:
      "Generate, save, and track personalized AI career roadmaps tailored to your goals, time, and budget.",
    url: "https://clear-road-ai.vercel.app",
    siteName: "ClearRoad",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClearRoad – AI Career Roadmaps",
    description:
      "Validate your career plan and follow a clear, AI-generated roadmap across phases, topics, and resources.",
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50`}>
        <Navbar />
        <div className="min-h-[calc(100vh-56px)]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
