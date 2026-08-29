import { Court } from "@/models/Court";
import { Reservation } from "@/models/Reservation";
import { getDayRange } from "@/utils/date";
import { handleReservationDates } from "../utils/handleReservationDates";
import { AppError } from "@/lib/errors/AppError";
import { requireUser } from "@/lib/auth";

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
  const user = await requireUser();

  if (!courtId || !date || !slot) throw new AppError("Missing fields", 400);

  const { today, requestedDate, slotDateTime, maxDate, now } =
    handleReservationDates(date, slot);

  if (requestedDate < today)
    throw new AppError("Past date is not allowed", 400);

  if (requestedDate > maxDate)
    throw new AppError("you can only reserve 14 days ahead", 400);

  if (slotDateTime < now) throw new AppError("Slot has already started", 400);

  const court = await Court.findById(courtId).select("price");

  if (!court) throw new AppError("Court not found", 404);

  const { startOfDay, endOfDay } = getDayRange(date);

  await Reservation.deleteMany({
    court: courtId,
    slot,
    date: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
    status: "PENDING",
    expiresAt: { $lt: new Date() },
  });

  const existing = await checkReservationExist(courtId, slot, date);

  if (existing) throw new AppError("Slot already reserved", 400);

  try {
    const reservation = await Reservation.create({
      user: user._id,

      court: courtId,

      date,

      slot,

      amount: court.price,

      status: "PENDING",
    });

    return reservation;
  } catch (err: any) {
    if (err?.code === 11000) throw new AppError("Slot already reserved", 400);

    throw err;
  }
}
