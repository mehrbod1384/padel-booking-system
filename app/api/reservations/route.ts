import { createReservation } from "@/features/booking/services/reservationService";
import { routeHandler } from "@/lib/routeHandler";
import { createReservationSchema } from "@/lib/validation";

export const POST = routeHandler(
  async (_req, { body }) => {
    const { courtId, date, slot } = body as {
      courtId: string;
      date: string;
      slot: string;
    };

    const reservation = await createReservation(courtId, slot, date);

    return Response.json({
      success: true,
      data: reservation,
    });
  },
  { schema: createReservationSchema, auth: true },
);
