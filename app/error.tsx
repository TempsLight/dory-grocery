"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SceneArt } from "@/components/art/scene-art";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="flex max-w-md flex-col items-center text-center">
        <SceneArt name="basket" className="w-40 text-berry-foreground" />
        <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight">
          Something spilled on our end
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          That page hit an unexpected error. Try again — it usually sorts itself
          out.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={reset} data-icon="inline-start">
            <RotateCcwIcon aria-hidden />
            Try again
          </Button>
          <Button variant="outline" nativeButton={false} render={<Link href="/" />}>
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
