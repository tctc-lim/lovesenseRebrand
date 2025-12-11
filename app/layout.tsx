import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { FloatingBookButton } from "@/components/FloatingBookButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Professional Counseling & Emotional Wellness Support | Love Sense",
  description:
    "Discover compassionate counseling, emotional support, and mental wellness services tailored to individuals, couples, families, and youth. Start your healing journey with Love Sense today.",
  keywords:
    "counseling services, mental health support, emotional wellness, therapy online, therapist near me, individual counseling, family therapy, couples therapy, youth counseling, trauma healing",
  metadataBase: new URL("https://mylovesense.online"),
  openGraph: {
    title: "Professional Counseling & Emotional Wellness Support | Love Sense",
    description:
      "Discover compassionate counseling, emotional support, and mental wellness services tailored to individuals, couples, families, and youth. Start your healing journey with Love Sense today.",
    url: "https://mylovesense.online",
    siteName: "Love Sense",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Counseling & Emotional Wellness Support | Love Sense",
    description:
      "Discover compassionate counseling, emotional support, and mental wellness services tailored to individuals, couples, families, and youth. Start your healing journey with Love Sense today.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-slate-100`}>
        <div className="grid-overlay" />
        <div className="blur-blob blue" />
        <div className="blur-blob cyan" />
        <div className="relative flex min-h-screen flex-col">
          <NavBar />
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <Footer />
          <FloatingBookButton />
        </div>
      </body>
    </html>
  );
}
