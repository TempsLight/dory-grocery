"use client";

import * as React from "react";
import Link from "next/link";
import {
  BadgeCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  CircleXIcon,
  XIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/components/providers/cart-provider";
import { RecentlyViewedProvider } from "@/components/providers/recently-viewed-provider";
import {
  Toast,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  toast,
  useToastManager,
} from "@/components/ui/toast";

const TYPE_ICON: Record<string, React.ReactNode> = {
  success: <BadgeCheckIcon aria-hidden className="text-brand-strong" />,
  info: <InfoIcon aria-hidden className="text-foreground" />,
  warning: <TriangleAlertIcon aria-hidden className="text-honey-foreground" />,
  error: <CircleXIcon aria-hidden className="text-destructive" />,
};

interface ToastAction {
  label: string;
  href: string;
}

function DoryToastList() {
  const { toasts } = useToastManager();

  return toasts.map((item) => {
    const action = (item.data as { action?: ToastAction } | undefined)?.action;
    const icon = item.type ? TYPE_ICON[item.type] : null;

    return (
      <Toast
        key={item.id}
        toast={item}
        className="rounded-xl border-border bg-popover shadow-lifted"
      >
        <ToastContent className="items-start gap-3 p-3.5">
          {icon ? (
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary [&_svg]:size-4">
              {icon}
            </span>
          ) : null}
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <ToastTitle className="text-sm leading-tight font-semibold" />
            <ToastDescription className="text-[0.8125rem] leading-snug" />
            {action ? (
              <Link
                href={action.href}
                className="mt-1.5 w-fit rounded-md text-[0.8125rem] font-semibold text-brand-strong underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                onClick={() => toast.close(item.id)}
              >
                {action.label}
              </Link>
            ) : null}
          </div>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => toast.close(item.id)}
            className={cn(
              "relative -m-1 shrink-0 rounded-md p-1 text-muted-foreground transition-colors",
              "hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
            )}
          >
            <XIcon aria-hidden className="size-4" />
          </button>
        </ToastContent>
      </Toast>
    );
  });
}

function DoryToaster() {
  return (
    <ToastProvider toastManager={toast}>
      <ToastPortal>
        <ToastViewport className="bottom-[calc(env(safe-area-inset-bottom,0px)+4.75rem)] z-[70] sm:bottom-4">
          <DoryToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delay={200}>
      <RecentlyViewedProvider>
        <CartProvider>
          {children}
          <DoryToaster />
        </CartProvider>
      </RecentlyViewedProvider>
    </TooltipProvider>
  );
}
