import { getUserFromToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { AppError } from "@/lib/errors/AppError";
import { handleApiError } from "@/lib/errors/handleApiError";
import { Reservation } from "@/models/Reservation";
import { getDayRange } from "@/utils/date";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const user = await getUserFromToken();

    if (!user) throw new AppError("Unauthorized", 401);

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
          todayRevenue: {
            $sum: "$amount",
          },

          todayReservation: {
            $sum: 1,
          },
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
  } catch (err) {
    return handleApiError(err);
  }
}
