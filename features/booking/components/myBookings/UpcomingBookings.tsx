import EmptyState from "@/components/ui/EmptyState";
import { CalendarDays } from "lucide-react";
import ReservationCard from "./ReservationCard";
import { cn } from "@/lib/utils";
import { useMyBookings } from "../../hooks/useMyBookings";
import ReservationCardSkeleton from "./ReservationCardSkeleton";

export default function UpcomingBookings() {
  const { data, isLoading } = useMyBookings();

  if (isLoading || !data) return <ReservationCardSkeleton />;

  const { upcomingReservations } = data;

  if (!upcomingReservations?.length)
    return (
      <EmptyState
        className="mx-auto mt-4 h-80 max-w-90"
        icon={<CalendarDays size={22} />}
        title="No upcoming bookings"
        description="Book a court and your reservation will show up here."
      />
    );

  return (
    <div className="mx-auto max-w-90 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarDays size={20} className="text-lime-300" />
          <h2 className="font-bold text-zinc-200 text-sm">Upcoming Bookings</h2>
        </div>

        <span className="text-zinc-200 bg-zinc-800/50 px-2 py-0.5 rounded-full text-sm">
          {upcomingReservations.length}
        </span>
      </div>
      <div className={cn("h-125 overflow-x-auto rounded-lg mt-1 mb-15")}>
        {upcomingReservations.map((reservation) => (
          <ReservationCard key={reservation._id} reservation={reservation} />
        ))}
      </div>
    </div>
  );
}
