import { useMyBookings } from "../../hooks/useMyBookings";
import ReservationCard from "./ReservationCard";
import { History } from "lucide-react";
import ReservationCardSkeleton from "./ReservationCardSkeleton";

export default function PastReservations() {
  const { data, isLoading } = useMyBookings();

  if (isLoading) return <ReservationCardSkeleton />;

  const { pastReservations } = data;

  if (!pastReservations?.length)
    return (
      <div className="flex items-center justify-center mx-auto max-w-90 h-80 mt-4 bg-zinc-800/50 rounded-lg">
        <p className="font-bold text-white text-xl">
          There is no past reservation
        </p>
      </div>
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
      <div className="h-125 overflow-x-auto rounded-lg mt-1 mb-10">
        {pastReservations.map((reservation: any) => (
          <ReservationCard key={reservation._id} reservation={reservation} />
        ))}
      </div>
    </div>
  );
}
