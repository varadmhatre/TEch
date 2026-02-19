import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Noir-Store",
  description: "High-end black-and-white e-commerce storefront"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
        <div className="min-h-screen bg-background">
          <header className="border-b border-hairline border-border">
            <div className="noir-container flex h-16 items-center justify-between">
              <span className="text-sm uppercase tracking-[0.24em]">Noir-Store</span>
              <nav className="text-xs text-muted">Minimal Commerce, Maximum Signal</nav>
            </div>
          </header>
          <main className="noir-container py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
