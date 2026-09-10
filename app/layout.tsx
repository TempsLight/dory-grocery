import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist_Mono, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dory.grocery"),
  title: {
    default: "Dory G",
    template: "%s · Dory Grocery",
  },
  description:
    "Fresh produce, pantry staples and everyday essentials from your neighbourhood grocery — hand-picked and delivered across San Isidro and nearby towns in Isabela, often same day.",
  applicationName: "Dory Grocery",
  keywords: [
    "grocery delivery",
    "fresh produce",
    "online supermarket",
    "San Isidro Isabela grocery",
    "Isabela grocery delivery",
  ],
  openGraph: {
    title: "Dory Grocery",
    description:
      "The neighbourhood grocery, delivered across San Isidro, Isabela. Fresh produce and everyday staples at honest prices.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7ef" },
    { media: "(prefers-color-scheme: dark)", color: "#26231f" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        sans.variable,
        display.variable,
        mono.variable,
        "font-sans",
      )}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
