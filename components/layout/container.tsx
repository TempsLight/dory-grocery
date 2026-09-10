import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  as: Tag = "div",
  ...props
}: React.ComponentProps<"div"> & { as?: React.ElementType }) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-[84rem] px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
