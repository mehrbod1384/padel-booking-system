import { getAllCourt } from "@/features/court/services/courtServices";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    const courts = await getAllCourt();

    return Response.json({
      success: true,
      courts,
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        err,
      },
      { status: 500 },
    );
  }
}
