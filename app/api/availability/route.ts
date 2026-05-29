import { connectDB } from "@/lib/db";
import { getAvailableSlots } from "@/features/booking/services/availabiltyService";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const courtId = searchParams.get("courtId");
    const date = searchParams.get("date");

    if (!courtId || !date) {
      return Response.json(
        {
          success: false,
          message: "courtId and date required",
        },
        {
          status: 400,
        },
      );
    }

    const availableSlots = await getAvailableSlots(courtId, date);

    return Response.json({
      success: true,
      availableSlots,
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
