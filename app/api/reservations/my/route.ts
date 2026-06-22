import { connectDB } from "@/lib/db";
import { handleApiError } from "@/lib/errors/handleApiError";
import { getUserFromToken } from "@/lib/auth";
import { Reservation } from "@/models/Reservation";

export async function GET() {
  try {
    await connectDB();

    const user = await getUserFromToken();

    const reservations = await Reservation.find({
      user: user._id,
      status: "CONFIRMED",
    })
      .populate("court")
      .sort({ date: -1 });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingReservations = reservations.filter(
      (reservation) => reservation.date >= today,
    );

    const pastReservations = reservations.filter(
      (reservation) => reservation.date < today,
    );

    return Response.json({
      success: true,
      data: {
        upcomingReservations,
        pastReservations,
      },
    });
  } catch (err) {
    console.log(err.response?.data || err.message);

    return handleApiError(err);
  }
}
