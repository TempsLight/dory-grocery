"use client";

import { BanknoteIcon, CreditCardIcon, WalletIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TextField } from "@/components/common/text-field";
import type { PaymentMethod } from "@/lib/types";

const OPTIONS: Array<{
  value: PaymentMethod;
  title: string;
  subtitle: string;
  icon: typeof BanknoteIcon;
}> = [
  {
    value: "cod",
    title: "Cash on delivery",
    subtitle: "Pay the rider when your order arrives",
    icon: BanknoteIcon,
  },
  {
    value: "card",
    title: "Credit or debit card",
    subtitle: "Visa, Mastercard, JCB",
    icon: CreditCardIcon,
  },
  {
    value: "ewallet",
    title: "E-wallet",
    subtitle: "GCash or Maya",
    icon: WalletIcon,
  },
];

export interface CardDetails {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

export function PaymentMethodPicker({
  method,
  onMethodChange,
  card,
  onCardChange,
  errors,
}: {
  method: PaymentMethod;
  onMethodChange: (m: PaymentMethod) => void;
  card: CardDetails;
  onCardChange: (patch: Partial<CardDetails>) => void;
  errors: Partial<Record<keyof CardDetails, string>>;
}) {
  return (
    <div>
      <RadioGroup
        value={method}
        onValueChange={(v) => onMethodChange(v as PaymentMethod)}
        className="gap-2.5"
        aria-label="Payment method"
      >
        {OPTIONS.map(({ value, title, subtitle, icon: Icon }) => {
          const selected = method === value;
          return (
            <label
              key={value}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors",
                selected
                  ? "border-brand bg-brand-soft/50"
                  : "border-border hover:bg-accent/40",
              )}
            >
              <RadioGroupItem value={value} />
              <Icon
                className={cn(
                  "size-5 shrink-0",
                  selected ? "text-brand-strong" : "text-muted-foreground",
                )}
                aria-hidden
              />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{title}</span>
                <span className="block text-xs text-muted-foreground">
                  {subtitle}
                </span>
              </span>
            </label>
          );
        })}
      </RadioGroup>

      {method === "card" ? (
        <div className="mt-4 grid gap-3 rounded-xl border border-border bg-paper/60 p-3.5 sm:grid-cols-2">
          <TextField
            containerClassName="sm:col-span-2"
            label="Card number"
            name="cardNumber"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="4242 4242 4242 4242"
            value={card.number}
            onChange={(e) =>
              onCardChange({
                number: e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 16)
                  .replace(/(\d{4})(?=\d)/g, "$1 "),
              })
            }
            error={errors.number}
          />
          <TextField
            containerClassName="sm:col-span-2"
            label="Name on card"
            name="cardName"
            autoComplete="cc-name"
            placeholder="Mara Villanueva"
            value={card.name}
            onChange={(e) => onCardChange({ name: e.target.value })}
            error={errors.name}
          />
          <TextField
            label="Expiry"
            name="cardExpiry"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            value={card.expiry}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
              onCardChange({
                expiry:
                  digits.length > 2
                    ? `${digits.slice(0, 2)}/${digits.slice(2)}`
                    : digits,
              });
            }}
            error={errors.expiry}
          />
          <TextField
            label="CVC"
            name="cardCvc"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            value={card.cvc}
            onChange={(e) =>
              onCardChange({ cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })
            }
            error={errors.cvc}
          />
          <p className="text-xs text-muted-foreground sm:col-span-2">
            This is a design concept — no card details are stored or charged.
          </p>
        </div>
      ) : null}

      {method === "ewallet" ? (
        <p className="mt-3 rounded-lg bg-paper/60 px-3.5 py-3 text-sm text-muted-foreground">
          After you place the order, you&rsquo;ll be taken to GCash or Maya to
          approve the payment. (Simulated in this concept.)
        </p>
      ) : null}

      {method === "cod" ? (
        <p className="mt-3 rounded-lg bg-paper/60 px-3.5 py-3 text-sm text-muted-foreground">
          Please prepare close to the exact amount — our riders carry limited
          change.
        </p>
      ) : null}
    </div>
  );
}
