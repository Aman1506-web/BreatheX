import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Anton } from "next/font/google";
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";
import TopMarquee from "@/components/TopMarquee";
import { Analytics } from "@vercel/analytics/next"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BreatheX | AI POWERED FITNESS",
  description: "Elevate your body and mind with Artificial Intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-background text-foreground overflow-x-hidden overscroll-y-none`}>
          <TopMarquee />
          <Navbar />
          <main className="pt-[100px] min-h-screen">{children}</main>
          <Analytics />
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
