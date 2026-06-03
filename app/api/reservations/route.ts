import { connectDB } from "@/lib/db";
import { getUserFromToken } from "@/lib/auth";
import { createReservation } from "@/features/booking/services/reservationService";
import { handleApiError } from "@/lib/errors/handleApiError";

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

    const reservation = await createReservation(user.id, courtId, slot, date);

    return Response.json({
      success: true,
      reservation,
    });
  } catch (err) {
    console.log(err.response?.data || err.message);

    return handleApiError(err);
  }
}
