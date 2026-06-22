import { Skeleton } from "@/components/ui/Skeleton";

export default function ReservationCardSkeleton() {
  return (
    <div className="mt-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-zinc-800/50 p-2 animate-pulse max-w-90 mx-auto rounded-lg mt-2"
        >
          <div className="flex items-center gap-3.5">
            <Skeleton className="w-40 h-30" />
            <div className="w-full">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-30 h-4" />
              </div>
              <div className="space-y-1 border-b border-zinc-700 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="w-18 h-3" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="w-18 h-3" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-24 rounded-2xl" />
                <Skeleton className="h-5 w-10" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
