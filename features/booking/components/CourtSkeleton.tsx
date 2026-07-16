import { Skeleton } from "@/components/ui/Skeleton";

export default function CourtTabsSkeleton() {
  return (
    <div className="flex gap-8 ">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="rounded-3xl border border-zinc-800 bg-zinc-900 p-3.25"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-2xl" />

            <div className="space-y-2">
              <Skeleton className="h-2 w-10" />
              <Skeleton className="h-1 w-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
