import { Reservation } from "@/models/Reservation";
import { getDayRange } from "@/utils/date";

export async function checkReservationExist(
  courtId: string,
  slot: string,
  date: string,
) {
  const { startOfDay, endOfDay } = getDayRange(date);

  const existingReservation = await Reservation.findOne({
    court: courtId,

    slot,

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

  return existingReservation ? true : false;
}

export async function createReservation(
  userId: string,
  courtId: string,
  slot: string,
  date: string,
) {
  const reservation = await Reservation.create({
    user: userId,

    court: courtId,

    date,

    slot,

    status: "PENDING",
  });

  return reservation;
}
