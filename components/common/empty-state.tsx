import * as React from "react";
import { cn } from "@/lib/utils";
import { SceneArt, type SceneName } from "@/components/art/scene-art";

interface EmptyStateProps {
  scene: SceneName;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const artSize = {
  sm: "w-28",
  md: "w-40",
  lg: "w-48",
} as const;

export function EmptyState({
  scene,
  title,
  description,
  children,
  className,
  size = "md",
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-2xl border border-dashed border-border bg-paper/60 px-6 py-12 text-center",
        className,
      )}
    >
      <SceneArt name={scene} className={cn(artSize[size], "mb-5 text-brand-strong")} />
      <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
        {title}
      </h3>
      {description ? (
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      {children ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {children}
        </div>
      ) : null}
    </div>
  );
}
