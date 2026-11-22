import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8 motion-enter" aria-busy="true">
      <div className="space-y-3">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-12 w-72 max-w-full" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="rounded-2xl border border-[#E5E5E5] overflow-hidden">
            <Skeleton className="aspect-square w-full rounded-none" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-8 w-28" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
