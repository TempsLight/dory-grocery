import Link from "next/link";

import { DoryWordmark } from "@/components/art/dory-mark";
import { SceneArt } from "@/components/art/scene-art";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-[84rem] items-center px-4 sm:px-6">
          <Link href="/" className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <DoryWordmark />
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="flex max-w-md flex-col items-center text-center">
          <SceneArt name="not-found" className="w-44" />
          <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            This page slipped off the shelf
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The link may be old or mistyped. Let&rsquo;s get you back to the
            groceries.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button nativeButton={false} render={<Link href="/" />}>Back to home</Button>
            <Button variant="outline" nativeButton={false} render={<Link href="/categories" />}>
              Browse all groceries
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
