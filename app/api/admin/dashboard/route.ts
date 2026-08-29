import { routeHandler } from "@/lib/routeHandler";
import { Reservation } from "@/models/Reservation";
import { getDayRange } from "@/utils/date";
import { NextResponse } from "next/server";
import { AppError } from "@/lib/errors/AppError";

export const GET = routeHandler(async (_req, { user }) => {
  if (user.role !== "ADMIN") throw new AppError("you are not allowed", 401);

  const { startOfDay, endOfDay } = getDayRange(new Date().toISOString());

  const totalReservation = await Reservation.countDocuments();
  const confirmedReservation = await Reservation.countDocuments({
    status: "CONFIRMED",
  });

  const todayData = await Reservation.aggregate([
    {
      $match: {
        status: "CONFIRMED",
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      },
    },
    {
      $group: {
        _id: null,
        todayRevenue: { $sum: "$amount" },
        todayReservation: { $sum: 1 },
      },
    },
  ]);

  return NextResponse.json({
    success: true,
    data: {
      totalReservation,
      confirmedReservation,
      todayData,
    },
  });
}, { auth: true });
