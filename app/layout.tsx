import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import PtfHeader from "./components/PtfHeader";
import PtfFooter from "./components/PtfFooter";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Loran Maes | Portfolio 2025",
  description: "Your local Fullstack Developer & YouTuber",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex flex-1 min-h-screen">
      <body
        className={`flex flex-1 flex-col ${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
      >
        <PtfHeader />
        <main className="flex flex-col flex-1 p-12 gap-4">{children}</main>
        <PtfFooter />
      </body>
    </html>
  );
}
