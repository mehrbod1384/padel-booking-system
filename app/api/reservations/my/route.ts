import { routeHandler } from "@/lib/routeHandler";
import { Reservation } from "@/models/Reservation";
import { AppError } from "@/lib/errors/AppError";

export const GET = routeHandler(
  async (_req, { user }) => {
    if (!user) throw new AppError("Unauthorized", 401);

    const reservations = await Reservation.find({
      user: user._id,
      status: "CONFIRMED",
    })
      .populate("court")
      .sort({ date: -1 });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingReservations = reservations.filter((r) => r.date >= today);
    const pastReservations = reservations.filter((r) => r.date < today);

    return Response.json({
      success: true,
      data: {
        upcomingReservations,
        pastReservations,
      },
    });
  },
  { auth: true },
);
