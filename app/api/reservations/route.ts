import { connectDB } from "@/lib/db";
import { createReservation } from "@/features/booking/services/reservationService";
import { handleApiError } from "@/lib/errors/handleApiError";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { courtId, date, slot } = body;

    const reservation = await createReservation(courtId, slot, date);

    return Response.json({
      success: true,
      data: reservation,
    });
  } catch (err) {
    console.log(err.response?.data || err.message);

    return handleApiError(err);
  }
}
