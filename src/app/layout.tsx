import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://intelliflowtechnologies01.github.io/sampada_home_furnitures"),
  title: {
    default: "Sampada — Ultra Premium Luxury Furniture",
    template: "%s | Sampada",
  },
  description:
    "Sampada crafts heirloom-quality furniture for the discerning few. Hand-finished solid wood, bespoke upholstery, and timeless design for the modern luxury home.",
  keywords: [
    "luxury furniture",
    "premium furniture",
    "handcrafted furniture",
    "bespoke furniture",
    "solid wood furniture",
    "designer furniture India",
    "Sampada furniture",
  ],
  authors: [{ name: "Sampada" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Sampada — Ultra Premium Luxury Furniture",
    description:
      "Heirloom-quality furniture for the discerning few. Hand-finished solid wood, bespoke upholstery, and timeless design.",
    siteName: "Sampada",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sampada — Ultra Premium Luxury Furniture",
    description:
      "Heirloom-quality furniture for the discerning few. Hand-finished solid wood, bespoke upholstery, and timeless design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
