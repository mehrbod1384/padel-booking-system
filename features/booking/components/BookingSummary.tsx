import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { formatPrice } from "../utils/helper";
import { formatDate } from "@/utils/date";

export default function BookingSummary({
  selectedCourt,
  selectedDate,
  selectedSlot,
  isBooking,
  onBook,
}: {
  selectedCourt: any;
  selectedDate: string;
  selectedSlot: string;
  isBooking: boolean;
  onBook: () => void;
}) {
  const isReady = selectedCourt && selectedDate && selectedSlot;

  return (
    <Card
      className={cn(
        "mt-4 mx-auto transition-all duration-500 overflow-hidden rounded-xl max-w-90 sm:w-auto p-4 border-zinc-800 bg-zinc-800/50 backdrop-blur-xl",
        isReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
    >
      <CardContent className="p-0 flex items-center gap-5">
        <div className="relative h-23 w-20">
          <img
            src="/lasse-moller-tvXGDRjFb9g-unsplash.jpg"
            alt="Court"
            className="h-full w-full object-cover rounded-2xl"
          />
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-bold text-zinc-300">
              {selectedCourt?.name}
            </p>

            <p className="text-xs text-zinc-400">Outdoor Court</p>
          </div>

          <div className="border-r pr-5 border-zinc-700 space-y-3">
            <div className="flex items-center gap-2 text-zinc-300">
              <Calendar size={14} />
              <span className="text-xs">{formatDate(selectedDate)}</span>
            </div>

            <div className="flex items-center gap-2 text-zinc-300">
              <Clock size={14} />
              <span className="text-xs">{selectedSlot}</span>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <span className="font-semibold text-xs text-zinc-400">Price</span>
          <p className="text-xl text-zinc-300 font-bold mt-1">
            ${formatPrice(selectedCourt?.price)}
          </p>
        </div>
      </CardContent>

      <div className="bg-orange-600 w-full p-2 pt-3 rounded-b-lg flex items-center justify-between">
        <div>
          <span className="font-semibold text-xs text-zinc-400">Total</span>
          <p className="text-lg text-zinc-300 font-bold">
            ${formatPrice(selectedCourt?.price)}
          </p>
        </div>

        <Button
          size={"lg"}
          disabled={isBooking}
          className="text-lg py-6 w-50 flex items-center justify-between"
          onClick={onBook}
        >
          <span></span>
          <span className="text-lime-300">
            {isBooking ? "Booking..." : "Book now"}
          </span>
          <span className="rounded-full bg-lime-300 p-2 text-black flex items-center justify-center">
            {isBooking ? <ClipLoader size={20} /> : <ArrowRight size={24} />}
          </span>
        </Button>
      </div>
    </Card>
  );
}
