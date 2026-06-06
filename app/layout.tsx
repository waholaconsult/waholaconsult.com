import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { ClerkProvider } from '@clerk/nextjs'

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Wahola - Digital Marketing Agency",
  description: "Premium digital marketing, website design, youtube automation, and ads.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className={figtree.className}>
        <ClerkProvider>
          <AnalyticsTracker />
          <Navbar />
          <main>{children}</main>
          <ConditionalFooter />
        </ClerkProvider>
      </body>
    </html>
  );
}
