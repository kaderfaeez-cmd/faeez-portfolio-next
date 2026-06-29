import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";

const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });

const url = "https://faeez-kader.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${profile.name} — Software Developer & AI Engineer`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  keywords: [
    "Faeez Kader", "Software Developer", "AI Engineer", "Full-Stack Developer",
    "Project Manager", "Next.js", "React", "TypeScript", "Computer Science", "South Africa",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url,
    title: `${profile.name} — Software Developer & AI Engineer`,
    description: profile.tagline,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Software Developer & AI Engineer`,
    description: profile.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-dvh">
        <Preloader />
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
