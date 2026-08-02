import { Reservation } from "@/models/Reservation";
import { slots } from "../utils/slots";
import { getDayRange } from "@/utils/date";
import { AppError } from "@/lib/errors/AppError";

export async function getAvailableSlots(courtId: string, date: string) {
  await Reservation.updateMany(
    {
      status: "PENDING",
      expiresAt: {
        $lt: new Date(),
      },
    },
    {
      $set: {
        status: "EXPIRED",
      },
    },
  );

  const { startOfDay, endOfDay } = getDayRange(date);

  if (!courtId || !date) throw new AppError("courtId and date required", 400);

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
