"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LockIcon,
  ChevronDownIcon,
  HouseIcon,
  BriefcaseIcon,
  MapPinIcon,
  LoaderCircleIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { getCategory } from "@/lib/catalog";
import { useCart } from "@/components/providers/cart-provider";
import { useDeliveryZone } from "@/hooks/use-delivery-zone";
import { SAVED_ADDRESSES } from "@/lib/delivery";
import {
  createOrderId,
  deliveryEtaLabel,
  saveOrder,
} from "@/lib/orders";
import { notify } from "@/lib/notify";
import type {
  AddressType,
  Order,
  OrderTotals,
  PaymentMethod as PaymentMethodType,
} from "@/lib/types";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TextField, TextAreaField } from "@/components/common/text-field";
import { OrderSummary } from "@/components/cart/order-summary";
import { OrderItemsList } from "@/components/cart/order-items-list";
import { PromoInput } from "@/components/cart/promo-input";
import { DeliverySpeedPicker } from "@/components/cart/delivery-speed";
import {
  PaymentMethodPicker,
  type CardDetails,
} from "@/components/checkout/payment-method";

interface FormState {
  fullName: string;
  phone: string;
  street: string;
  barangay: string;
  city: string;
  addressType: AddressType;
  instructions: string;
}

const EMPTY_FORM: FormState = {
  fullName: "",
  phone: "",
  street: "",
  barangay: "",
  city: "",
  addressType: "home",
  instructions: "",
};

const ADDRESS_TYPES: Array<{
  value: AddressType;
  label: string;
  icon: typeof HouseIcon;
}> = [
  { value: "home", label: "Home", icon: HouseIcon },
  { value: "work", label: "Work", icon: BriefcaseIcon },
  { value: "other", label: "Other", icon: MapPinIcon },
];

const PHONE_RE = /^(09\d{9}|\+639\d{9})$/;

function StepHeading({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-primary-foreground tabular-nums">
        {n}
      </span>
      <h2 className="font-display text-lg font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </div>
  );
}

export function CheckoutView() {
  const router = useRouter();
  const { hydrated, lines, totals, state, clear } = useCart();
  const { address } = useDeliveryZone();

  const [form, setForm] = React.useState<FormState>(EMPTY_FORM);
  const [payment, setPayment] = React.useState<PaymentMethodType>("cod");
  const [card, setCard] = React.useState<CardDetails>({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [placing, setPlacing] = React.useState(false);
  const [prefilled, setPrefilled] = React.useState(false);
  const [showItems, setShowItems] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  // Prefill from the selected saved address, once.
  React.useEffect(() => {
    if (prefilled || !address) return;
    setForm({
      fullName: address.recipient,
      phone: address.phone,
      street: address.street,
      barangay: address.barangay,
      city: address.city,
      addressType: address.type,
      instructions: address.instructions ?? "",
    });
    setPrefilled(true);
  }, [address, prefilled]);

  // Nothing to check out.
  React.useEffect(() => {
    if (hydrated && lines.length === 0 && !placing) {
      router.replace("/cart");
    }
  }, [hydrated, lines.length, placing, router]);

  if (!hydrated || lines.length === 0) {
    return (
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl bg-muted"
            />
          ))}
        </div>
        <div className="h-72 animate-pulse rounded-2xl bg-muted" />
      </div>
    );
  }

  const set = (patch: Partial<FormState>) => {
    setForm((f) => ({ ...f, ...patch }));
    setErrors((e) => {
      const next = { ...e };
      for (const k of Object.keys(patch)) delete next[k];
      return next;
    });
  };

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (form.fullName.trim().length < 2)
      next.fullName = "Tell us who to hand the order to.";
    const phone = form.phone.replace(/[\s-]/g, "");
    if (!phone) next.phone = "We need a number for delivery updates.";
    else if (!PHONE_RE.test(phone))
      next.phone = "Use a PH mobile number, e.g. 0917 123 4567.";
    if (!form.street.trim())
      next.street = "Add a house/unit number and street.";
    if (!form.barangay.trim()) next.barangay = "Barangay is required.";
    if (!form.city.trim()) next.city = "City or municipality is required.";

    if (payment === "card") {
      if (card.number.replace(/\s/g, "").length !== 16)
        next.number = "Enter the 16-digit card number.";
      if (card.name.trim().length < 2) next.name = "Name on card is required.";
      if (!/^\d{2}\/\d{2}$/.test(card.expiry))
        next.expiry = "Use MM/YY.";
      if (card.cvc.length < 3) next.cvc = "3–4 digits.";
    }
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      notify.warning("A few details need fixing", {
        description: "Check the highlighted fields and try again.",
      });
      const firstKey = Object.keys(found)[0];
      const el = formRef.current?.querySelector<HTMLElement>(
        `[name="${firstKey}"], [name="card${firstKey[0]?.toUpperCase()}${firstKey.slice(1)}"]`,
      );
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
      return;
    }

    setPlacing(true);
    const plainTotals: OrderTotals = {
      itemCount: totals.itemCount,
      subtotal: totals.subtotal,
      savings: totals.savings,
      deliveryFee: totals.deliveryFee,
      deliveryLabel: totals.deliveryLabel,
      freeDeliveryThreshold: totals.freeDeliveryThreshold,
      amountToFreeDelivery: totals.amountToFreeDelivery,
      promoDiscount: totals.promoDiscount,
      total: totals.total,
    };

    const order: Order = {
      id: createOrderId(),
      placedAt: Date.now(),
      lines: lines.map((l) => {
        const cat = getCategory(l.product.category);
        return {
          productId: l.product.id,
          name: l.product.name,
          brand: l.product.brand,
          size: l.product.size,
          unitPrice: l.product.price,
          quantity: l.quantity,
          photoId: l.product.photoId,
          illustration: cat?.illustration ?? "pantry",
          tint: cat?.tint ?? "var(--paper)",
        };
      }),
      details: {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        street: form.street.trim(),
        barangay: form.barangay.trim(),
        city: form.city.trim(),
        addressType: form.addressType,
        instructions: form.instructions.trim() || undefined,
        speed: state.speed,
        payment,
      },
      totals: plainTotals,
      etaLabel: deliveryEtaLabel(state.speed),
    };

    // Small delay so the button state reads as "working".
    window.setTimeout(() => {
      saveOrder(order);
      clear();
      router.push(`/order/${order.id}`);
    }, 850);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-10">
        <div className="space-y-8">
          {/* 1 · Delivery details */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <StepHeading n={1} title="Delivery details" />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Full name"
                name="fullName"
                autoComplete="name"
                value={form.fullName}
                onChange={(e) => set({ fullName: e.target.value })}
                error={errors.fullName}
              />
              <TextField
                label="Mobile number"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="0917 123 4567"
                value={form.phone}
                onChange={(e) => set({ phone: e.target.value })}
                error={errors.phone}
              />
              <TextField
                containerClassName="sm:col-span-2"
                label="House / unit no. and street"
                name="street"
                autoComplete="address-line1"
                value={form.street}
                onChange={(e) => set({ street: e.target.value })}
                error={errors.street}
              />
              <TextField
                label="Barangay"
                name="barangay"
                value={form.barangay}
                onChange={(e) => set({ barangay: e.target.value })}
                error={errors.barangay}
              />
              <TextField
                label="Town / municipality"
                name="city"
                autoComplete="address-level2"
                placeholder="e.g. San Isidro"
                hint="We deliver within Isabela."
                value={form.city}
                onChange={(e) => set({ city: e.target.value })}
                error={errors.city}
              />
            </div>

            <fieldset className="mt-4">
              <legend className="mb-2 text-sm font-medium">Address type</legend>
              <div className="flex flex-wrap gap-2">
                {ADDRESS_TYPES.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => set({ addressType: value })}
                    aria-pressed={form.addressType === value}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                      form.addressType === value
                        ? "border-brand bg-brand-soft text-brand-soft-foreground"
                        : "border-border hover:bg-accent/50",
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-4">
              <TextAreaField
                label="Delivery instructions"
                name="instructions"
                optional
                placeholder="Gate code, landmark, where to leave it…"
                value={form.instructions}
                onChange={(e) => set({ instructions: e.target.value })}
              />
            </div>

            {SAVED_ADDRESSES.length ? (
              <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                <span className="text-xs text-muted-foreground">
                  Use a saved address:
                </span>
                {SAVED_ADDRESSES.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() =>
                      set({
                        fullName: a.recipient,
                        phone: a.phone,
                        street: a.street,
                        barangay: a.barangay,
                        city: a.city,
                        addressType: a.type,
                        instructions: a.instructions ?? "",
                      })
                    }
                    className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium hover:border-brand/40 hover:bg-accent/50"
                  >
                    {a.label} · {a.city}
                  </button>
                ))}
              </div>
            ) : null}
          </section>

          {/* 2 · Delivery speed */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <StepHeading n={2} title="Delivery window" />
            <DeliverySpeedPicker />
            <p className="mt-3 text-xs text-muted-foreground">
              Estimated arrival:{" "}
              <span className="font-medium text-foreground">
                {deliveryEtaLabel(state.speed)}
              </span>
            </p>
          </section>

          {/* 3 · Payment */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <StepHeading n={3} title="Payment" />
            <PaymentMethodPicker
              method={payment}
              onMethodChange={setPayment}
              card={card}
              onCardChange={(patch) => {
                setCard((c) => ({ ...c, ...patch }));
                setErrors((e) => {
                  const n = { ...e };
                  for (const k of Object.keys(patch)) delete n[k];
                  return n;
                });
              }}
              errors={errors}
            />
          </section>
        </div>

        {/* Summary rail */}
        <div>
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
              <button
                type="button"
                onClick={() => setShowItems((s) => !s)}
                aria-expanded={showItems}
                className="flex w-full items-center justify-between gap-2 text-left"
              >
                <span className="font-display text-base font-semibold tracking-tight">
                  {totals.itemCount} {totals.itemCount === 1 ? "item" : "items"}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-brand-strong">
                  {showItems ? "Hide" : "Review"}
                  <ChevronDownIcon
                    className={cn(
                      "size-4 transition-transform",
                      showItems && "rotate-180",
                    )}
                    aria-hidden
                  />
                </span>
              </button>
              {showItems ? (
                <OrderItemsList
                  className="mt-2 max-h-72 overflow-y-auto"
                  items={lines.map((l) => ({
                    productId: l.product.id,
                    name: l.product.name,
                    brand: l.product.brand,
                    size: l.product.size,
                    quantity: l.quantity,
                    unitPrice: l.product.price,
                    photoId: l.product.photoId,
                    illustration:
                      getCategory(l.product.category)?.illustration ?? "pantry",
                    category: l.product.category,
                  }))}
                />
              ) : null}
            </div>

            <OrderSummary
              totals={totals}
              title="Order summary"
              promoSlot={<PromoInput />}
              footer={
                <>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={placing}
                    data-icon="inline-start"
                  >
                    {placing ? (
                      <>
                        <LoaderCircleIcon className="animate-spin" aria-hidden />
                        Placing your order…
                      </>
                    ) : (
                      <>
                        <LockIcon aria-hidden />
                        Place order · {formatPrice(totals.total)}
                      </>
                    )}
                  </Button>
                  <p className="mt-2.5 text-center text-xs text-muted-foreground">
                    By placing this order you agree to Dory&rsquo;s{" "}
                    <Link href="/help" className="underline underline-offset-2">
                      terms
                    </Link>
                    . No payment is processed in this concept.
                  </p>
                </>
              }
            />
          </div>
        </div>
      </div>

      {/* Sticky mobile place-order bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur-md lg:hidden"
        style={{
          paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Total</p>
            <p
              className="font-display text-lg leading-none font-semibold tracking-tight tabular-nums"
              data-numeric
            >
              {formatPrice(totals.total)}
            </p>
          </div>
          <Button
            type="submit"
            size="lg"
            className="flex-1"
            disabled={placing}
            data-icon="inline-start"
          >
            {placing ? (
              <LoaderCircleIcon className="animate-spin" aria-hidden />
            ) : (
              <LockIcon aria-hidden />
            )}
            {placing ? "Placing…" : "Place order"}
          </Button>
        </div>
      </div>
      <div className="h-20 lg:hidden" aria-hidden />
    </form>
  );
}
