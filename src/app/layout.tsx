import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import { AosInit } from "@/components/AosInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const montserratAlternates = Montserrat_Alternates({
  variable: "--font-montserrat-alternates",
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Triloqa",
  description: "Triloqa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserratAlternates.variable} antialiased overflow-x-hidden`}
      >
        <AosInit />
        {children}
      </body>
    </html>
  );
}
