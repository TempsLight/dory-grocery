import * as React from "react";
import { cn } from "@/lib/utils";

interface TextFieldProps
  extends Omit<React.ComponentProps<"input">, "id"> {
  label: string;
  hint?: string;
  error?: string | null;
  optional?: boolean;
  containerClassName?: string;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, hint, error, optional, className, containerClassName, ...props },
    ref,
  ) {
    const reactId = React.useId();
    const id = props.name ? `field-${props.name}` : reactId;
    const describedBy = [
      hint ? `${id}-hint` : null,
      error ? `${id}-error` : null,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={cn("space-y-1.5", containerClassName)}>
        <label
          htmlFor={id}
          className="flex items-center justify-between text-sm font-medium"
        >
          {label}
          {optional ? (
            <span className="text-xs font-normal text-muted-foreground">
              Optional
            </span>
          ) : null}
        </label>
        <input
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={cn(
            "h-11 w-full rounded-lg border bg-card px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40",
            error
              ? "border-destructive focus-visible:border-destructive"
              : "border-input focus-visible:border-ring",
            className,
          )}
          {...props}
        />
        {error ? (
          <p id={`${id}-error`} className="text-xs text-destructive">
            {error}
          </p>
        ) : hint ? (
          <p id={`${id}-hint`} className="text-xs text-muted-foreground">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

export function TextAreaField({
  label,
  hint,
  error,
  optional,
  className,
  containerClassName,
  ...props
}: Omit<React.ComponentProps<"textarea">, "id"> & {
  label: string;
  hint?: string;
  error?: string | null;
  optional?: boolean;
  containerClassName?: string;
}) {
  const reactId = React.useId();
  const id = props.name ? `field-${props.name}` : reactId;
  return (
    <div className={cn("space-y-1.5", containerClassName)}>
      <label
        htmlFor={id}
        className="flex items-center justify-between text-sm font-medium"
      >
        {label}
        {optional ? (
          <span className="text-xs font-normal text-muted-foreground">
            Optional
          </span>
        ) : null}
      </label>
      <textarea
        id={id}
        rows={3}
        aria-invalid={error ? true : undefined}
        className={cn(
          "w-full resize-none rounded-lg border bg-card px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40",
          error
            ? "border-destructive"
            : "border-input focus-visible:border-ring",
          className,
        )}
        {...props}
      />
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
