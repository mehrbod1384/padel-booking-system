import { Skeleton } from "@/components/ui/Skeleton";

export default function SlotSkeleton() {
  return Array.from({ length: 9 }).map((_, index) => (
    <Skeleton key={index} className="w-25 h-6" />
  ));
}
