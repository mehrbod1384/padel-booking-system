import { Court } from "@/models/Court";
import { Reservation } from "@/models/Reservation";
import { getDayRange } from "@/utils/date";
import { handleReservationDates } from "../utils/handleReservationDates";
import { AppError } from "@/lib/errors/AppError";
import { getUserFromToken } from "@/lib/auth";

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
  courtId: string,
  slot: string,
  date: string,
) {
  const user = await getUserFromToken();

  if (!courtId || !date || !slot) throw new AppError("Missing fields", 400);

  const { today, requestedDate, slotDateTime, maxDate, now } =
    handleReservationDates(date, slot);

  if (requestedDate < today)
    throw new AppError("Past date is not allowed", 400);

  if (requestedDate > maxDate)
    throw new AppError("you can only reserve 14 days ahead", 400);

  if (slotDateTime < now) throw new AppError("Slot has already started", 400);

  const existing = await checkReservationExist(courtId, slot, date);

  if (existing) throw new AppError("Slot already reserved", 400);

  const { price: amount } = await Court.findById(courtId).select("price");

  const reservation = await Reservation.create({
    user: user._id,

    court: courtId,

    date,

    slot,

    amount,

    status: "PENDING",
  });

  return reservation;
}
