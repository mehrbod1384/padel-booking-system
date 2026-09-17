import EmptyState from "@/components/ui/EmptyState";
import { useMyBookings } from "../../hooks/useMyBookings";
import ReservationCard from "./ReservationCard";
import { History } from "lucide-react";
import ReservationCardSkeleton from "./ReservationCardSkeleton";

export default function PastReservations() {
  const { data, isLoading } = useMyBookings();

  if (isLoading || !data) return <ReservationCardSkeleton />;

  const { pastReservations } = data;

  if (!pastReservations?.length)
    return (
      <EmptyState
        className="mx-auto mt-4 h-80 max-w-90"
        icon={<History size={22} />}
        title="No past reservations"
        description="Your booking history will appear here after your reservations are played."
      />
    );

  return (
    <div className="mx-auto max-w-90 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <History size={20} className="text-lime-300" />
          <h2 className="font-bold text-zinc-200 text-sm">Past Reservations</h2>
        </div>

        <span className="text-zinc-200 bg-zinc-800/50 px-2 py-0.5 rounded-full text-sm">
          {pastReservations.length}
        </span>
      </div>
      <div className="h-125 overflow-x-auto rounded-lg mt-1 mb-15">
        {pastReservations.map((reservation) => (
          <ReservationCard key={reservation._id} reservation={reservation} />
        ))}
      </div>
    </div>
  );
}
