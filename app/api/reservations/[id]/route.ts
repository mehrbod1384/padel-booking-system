import { routeHandler } from "@/lib/routeHandler";
import { Reservation } from "@/models/Reservation";

export const GET = routeHandler(async (_req, { params }) => {
  const { id } = (await params) as { id: string };

  const reservation = await Reservation.findById(id).populate("court");

  return Response.json({
    success: true,
    data: reservation,
  });
});
