import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { generateBookingDates } from "../utils/generateBookingDates";

export default function DateSelector({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: string;
  setSelectedDate: any;
}) {
  const bookingDates = generateBookingDates();

  return (
    <div>
      <h2 className="text-md font-semibold text-white mb-4 flex items-center gap-3">
        <span>
          <Calendar size={16} />
        </span>
        <span>Select Date</span>
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {bookingDates.map((date: any) => (
          <button
            key={date.day}
            className={cn(
              "px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-800 text-white transition-all shrink-0",
              selectedDate === date.fullDate &&
                "border border-lime-300 text-lime-300",
            )}
            onClick={() => setSelectedDate(date.fullDate)}
          >
            <p className="text-md font-bold">{date.day}</p>

            <p className="text-sm">{date.weekDay}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
