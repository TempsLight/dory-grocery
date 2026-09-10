import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductBrowserSkeleton } from "@/components/shop/product-skeletons";

export default function Loading() {
  return (
    <Container className="py-6 lg:py-8">
      <Skeleton className="h-4 w-64" />
      <div className="mt-4 flex items-center gap-4">
        <Skeleton className="size-16 rounded-2xl sm:size-[4.5rem]" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-52" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <div className="mt-7">
        <ProductBrowserSkeleton />
      </div>
    </Container>
  );
}
