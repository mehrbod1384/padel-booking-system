import { connectDB } from "@/lib/db";
import { getAvailableSlots } from "@/features/booking/services/availabiltyService";
import { handleApiError } from "@/lib/errors/handleApiError";
import { AppError } from "@/lib/errors/AppError";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const courtId = searchParams.get("courtId");
    const date = searchParams.get("date");

    if (!date || !courtId) throw new AppError("date and courtId required", 400);

    const availableSlots = await getAvailableSlots(courtId, date);

    return Response.json({
      success: true,
      data: availableSlots,
    });
  } catch (err) {
    return handleApiError(err);
  }
}
