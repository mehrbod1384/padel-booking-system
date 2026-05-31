import { Reservation } from "@/models/Reservation";
import { slots } from "../utils/slots";
import { getDayRange } from "@/utils/date";

export async function getAvailableSlots(courtId: string, date: string) {
  const { startOfDay, endOfDay } = getDayRange(date);

  const reservations = await Reservation.find({
    court: courtId,

    date: {
      $gte: startOfDay,
      $lte: endOfDay,
    },

    $or: [
      {
        status: "CONFIRMED",
      },
      {
        status: "PENDING",
        expiresAt: {
          $gte: new Date(),
        },
      },
    ],
  });

  const reservedSlots = reservations.map((reservation) => reservation.slot);

  return slots.filter((slot) => !reservedSlots.includes(slot));
}
