import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Remindify",
  description: "A productivity tool to help Matt stay on track.",
  keywords: ["productivity", "task management", "Remindify"],
  authors: [{ name: "Matt" }],
  openGraph: {
    title: "Remindify",
    description: "A productivity tool to help Matt stay on track.",
    url: "https://remind-matt.to",
    siteName: "Remindify",
    images: [
      {
        url: "https://remind-matt.to/og-image.png",
        width: 1200,
        height: 630,
        alt: "Remindify",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remindify",
    description: "A productivity tool to help Matt stay on track.",
    images: ["https://remind-matt.to/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
