import type { Metadata } from "next";
import Link from "next/link";
import {
  TruckIcon,
  ClockIcon,
  RotateCcwIcon,
  SnowflakeIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Crumbs } from "@/components/common/crumbs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Help & delivery",
  description:
    "How Dory Grocery delivery works — windows, fees, the freshness promise, and how to reach us.",
};

const FACTS = [
  {
    icon: ClockIcon,
    title: "2-hour windows",
    body: "Choose a slot at checkout. We text you when the rider sets off.",
  },
  {
    icon: TruckIcon,
    title: "₱59 standard, free over ₱1,500",
    body: "Express delivery within 90 minutes is ₱129, subject to rider availability.",
  },
  {
    icon: SnowflakeIcon,
    title: "Cold chain kept",
    body: "Chilled and frozen items travel in insulated liners with ice packs.",
  },
  {
    icon: RotateCcwIcon,
    title: "Freshness refund",
    body: "Not happy with an item's quality? Tell us within 24 hours for a refund — no photos required.",
  },
];

const FAQS = [
  {
    q: "Which areas do you deliver to?",
    a: "We cover San Isidro and the nearby towns of Alicia, Cauayan City, Cabatuan, Reina Mercedes, Naguilian and Angadanan, all within Isabela. Enter your address at checkout to confirm your barangay is on the route.",
  },
  {
    q: "How are delivery windows scheduled?",
    a: "Slots open from 9 AM daily in two-hour windows. Standard orders placed before 3 PM are usually delivered the same day; later orders roll to the next morning.",
  },
  {
    q: "Can I change or cancel an order?",
    a: "Yes, within about 15 minutes of placing it, while it's still being packed. Contact us with your order number and we'll catch it before it leaves the store.",
  },
  {
    q: "What if something is missing or damaged?",
    a: "Message us within 24 hours with your order number. We'll refund the item to your original payment method, or add credit to your account — your choice.",
  },
  {
    q: "Do you substitute out-of-stock items?",
    a: "Only if you ask us to. By default, an unavailable item is simply removed and refunded, and we let you know before delivery.",
  },
  {
    q: "Is this a real store?",
    a: "This is a product-design concept. Prices, stock and delivery are illustrative, and no payment is processed.",
  },
];

export default function HelpPage() {
  return (
    <Container className="py-6 lg:py-8">
      <Crumbs
        items={[{ label: "Home", href: "/" }, { label: "Help & delivery" }]}
      />

      <header className="mt-4 max-w-2xl">
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Help &amp; delivery
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Everything about how we get groceries to your door.
        </p>
      </header>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {FACTS.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-card p-4"
          >
            <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-brand-strong">
              <Icon className="size-4.5" aria-hidden />
            </span>
            <h2 className="mt-3 text-sm font-semibold">{title}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Frequently asked
          </h2>
          <Accordion className="mt-4 divide-y divide-border border-y border-border">
            {FAQS.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q} className="border-0">
                <AccordionTrigger className="py-4 text-left text-sm font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-paper p-5">
          <h2 className="font-display text-base font-semibold tracking-tight">
            Still need a hand?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Our team in San Isidro is on from 7 AM to 9 PM, every day.
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2.5">
              <PhoneIcon className="size-4 text-brand" aria-hidden />
              <span className="font-medium" data-numeric>
                (078) 305 2213
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <PhoneIcon className="size-4 text-brand" aria-hidden />
              <span className="font-medium" data-numeric>
                0917 812 4455{" "}
                <span className="font-normal text-muted-foreground">
                  (Viber / SMS)
                </span>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <MailIcon className="size-4 text-brand" aria-hidden />
              <span className="font-medium">help@dorygrocery.ph</span>
            </li>
          </ul>
          <Link
            href="/categories"
            className="mt-5 inline-flex text-sm font-semibold text-brand-strong hover:underline"
          >
            Back to shopping →
          </Link>
        </aside>
      </div>
    </Container>
  );
}
