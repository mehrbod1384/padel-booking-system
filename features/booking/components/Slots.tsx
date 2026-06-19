import { Clock } from "lucide-react";
import { useAvailablity } from "../hooks/useAvailability";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Slots({
  selectedCourt,
  selectedDate,
  selectedSlot,
  setSelectedSlot,
}: {
  selectedCourt: any;
  selectedDate: string;
  selectedSlot: string;
  setSelectedSlot: any;
}) {
  const { slots, isLoading } = useAvailablity(selectedCourt._id, selectedDate);

  if (isLoading) return <p>loading...</p>;

  return (
    <div className="mt-2">
      <h2 className="text-md font-semibold text-white mb-4 flex items-center gap-3">
        <span>
          <Clock size={16} />
        </span>
        <span>Select a time slot</span>
      </h2>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {slots?.map((slot: any) => (
          <Button
            key={slot}
            size={"sm"}
            className={cn(
              "bg-zinc-800 border-none text-white transition-all duration-200 hover:scale-105 active:scale-95",
              selectedSlot === slot
                ? "bg-lime-300 text-black hover:bg-lime-300 ring-2 ring-lime-300/50 shadow-lg shadow-lime-400/20 scale-105"
                : "hover:bg-zinc-800/50",
            )}
            onClick={() => setSelectedSlot(slot)}
          >
            {slot}
          </Button>
        ))}
      </div>
    </div>
  );
}
