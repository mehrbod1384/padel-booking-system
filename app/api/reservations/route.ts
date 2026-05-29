import { connectDB } from "@/lib/db";
import { getUserFromToken } from "@/lib/auth";
import {
  checkReservationExist,
  createReservation,
} from "@/features/booking/services/reservationService";

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await getUserFromToken();

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

    const existing = await checkReservationExist(courtId, slot, date);

    if (existing) {
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

    const reservation = await createReservation(user.id, courtId, slot, date);

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
