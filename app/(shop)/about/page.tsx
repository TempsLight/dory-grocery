import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Crumbs } from "@/components/common/crumbs";
import { Button } from "@/components/ui/button";
import { DoryMark } from "@/components/art/dory-mark";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dory Grocery is a concept for a neighbourhood grocery in San Isidro, Isabela that delivers — fresh-picked produce and everyday staples, brought to your door.",
};

export default function AboutPage() {
  return (
    <Container className="py-6 lg:py-8">
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "About Dory" }]} />

      <article className="mx-auto mt-6 max-w-2xl">
        <DoryMark className="size-10 text-brand" />
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">
          A neighbourhood grocery that happens to deliver
        </h1>
        <div className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground">
          <p>
            <span className="text-foreground">Dory</span> is named after the
            small, flat-bottomed river boat that Cagayan Valley families used to
            carry goods downriver to the next town. It&rsquo;s an unglamorous,
            dependable thing — which is exactly what a grocery run should be.
          </p>
          <p>
            We&rsquo;re a small crew based in San Isidro, Isabela. We pick from
            the public market and partner farms around the valley each morning,
            pack orders by hand, and send them out to nearby towns in two-hour
            windows. No warehouse-aged produce, no fifty near-identical brands of
            the same thing — just a tight, honest range of what people actually
            cook with, at prices that make a weekly shop feel reasonable.
          </p>
          <p>
            This site is a product-design concept: the catalogue, prices and
            delivery are illustrative, and nothing is charged. But the intent is
            real — a grocery experience that respects your time and your
            trust.
          </p>
        </div>

        <div className="mt-8">
          <Button nativeButton={false} render={<Link href="/categories" />}>
            Start a basket
          </Button>
        </div>
      </article>
    </Container>
  );
}
