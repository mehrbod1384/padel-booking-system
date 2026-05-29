import { connectDB } from "@/lib/db";
import { Reservation } from "@/models/Reservation";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await getUserFromToken();

    console.log(user);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const body = await req.json();

    const { courtId, date, slot } = body;

    if (!courtId || !date || !slot) {
      return Response.json(
        {
          success: false,
          message: "Missing fields",
        },
        {
          status: 400,
        },
      );
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 50, 50, 999);

    const existingReservation = await Reservation.findOne({
      court: courtId,

      slot,

      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },

      status: {
        $in: ["PENDING", "CONFIRMED"],
      },
    });

    if (existingReservation) {
      return Response.json(
        {
          success: false,
          message: "Slot already reserved",
        },
        {
          status: 400,
        },
      );
    }

    const reservation = await Reservation.create({
      user: user.id,

      court: courtId,

      date: startOfDay,

      slot,

      status: "PENDING",
    });

    return Response.json({
      success: true,
      reservation,
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        message: "Server error",
        err,
      },
      {
        status: 500,
      },
    );
  }
}
