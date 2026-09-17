import { StatCardSkeleton, TableSkeleton } from "@/components/ui/Skeleton";

export default function AdminLoading() {
  return (
    <div className="space-y-5">
      <StatCardSkeleton />

      <div className="rounded-xl border border-zinc-800 bg-zinc-800/50">
        <TableSkeleton rows={6} columns={5} />
      </div>
    </div>
  );
}