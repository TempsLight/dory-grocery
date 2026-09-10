"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/components/providers/recently-viewed-provider";

export function RecordView({ productId }: { productId: string }) {
  const { record } = useRecentlyViewed();
  useEffect(() => {
    record(productId);
  }, [productId, record]);
  return null;
}
