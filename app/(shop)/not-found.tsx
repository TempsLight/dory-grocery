import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SceneArt } from "@/components/art/scene-art";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/catalog";

export default function ShopNotFound() {
  return (
    <Container className="py-16">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <SceneArt name="not-found" className="w-40" />
        <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight">
          We couldn&rsquo;t find that
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The product or aisle may have been renamed or is no longer stocked.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button nativeButton={false} render={<Link href="/" />}>Back to home</Button>
          <Button variant="outline" nativeButton={false} render={<Link href="/categories" />}>
            All groceries
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.slice(0, 5).map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium hover:border-brand/40 hover:bg-accent/50"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
