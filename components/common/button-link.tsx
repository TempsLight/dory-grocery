import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type ButtonProps = React.ComponentProps<typeof Button>;

/**
 * A <Button> that renders as a Next <Link>. Sets `nativeButton={false}` so
 * Base UI doesn't warn about the missing native <button> element.
 */
export function ButtonLink({
  href,
  prefetch,
  ...props
}: Omit<ButtonProps, "render" | "nativeButton"> & {
  href: string;
  prefetch?: boolean;
}) {
  return (
    <Button
      nativeButton={false}
      render={<Link href={href} prefetch={prefetch} />}
      {...props}
    />
  );
}
