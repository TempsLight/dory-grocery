import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lifted focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1 pb-14 lg:pb-0">
        {children}
      </main>
      <SiteFooter />
      <MobileTabBar />
    </div>
  );
}
