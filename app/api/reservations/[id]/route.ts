import { connectDB } from "@/lib/db";
import { handleApiError } from "@/lib/errors/handleApiError";
import { Reservation } from "@/models/Reservation";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const reservation = await Reservation.findById(id).populate("court");

    return Response.json({
      success: true,
      data: reservation,
    });
  } catch (err) {
    return handleApiError(err);
  }
}
