import { getAvailableSlots } from "@/features/booking/services/availabiltyService";
import { routeHandler } from "@/lib/routeHandler";
import { AppError } from "@/lib/errors/AppError";

export const GET = routeHandler(async (req) => {
  const { searchParams } = new URL(req.url);

  const courtId = searchParams.get("courtId");
  const date = searchParams.get("date");

  if (!date || !courtId) throw new AppError("date and courtId required", 400);

  const availableSlots = await getAvailableSlots(courtId, date);

  return Response.json({
    success: true,
    data: availableSlots,
  });
});
