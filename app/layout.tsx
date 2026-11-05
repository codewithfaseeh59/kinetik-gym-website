import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Loader from "@/components/layout/Loader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KINETIK — More than fitness. Living at full power.",
  description:
    "KINETIK is a premium fitness club with pools, wellness, strength training and group classes in Ashford, Brightwater, Crestview and Dunmore.",
};

export const viewport: Viewport = {
  themeColor: "#161003",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Browser extensions inject attributes into <html>/<body> before React hydrates.
    <html lang="en" className={`${anton.variable} ${space.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <noscript>
          <style>{`[data-split]{visibility:visible}[data-loader]{display:none}`}</style>
        </noscript>
        <Loader />
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
