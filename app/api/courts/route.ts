import { connectDB } from "@/lib/db";
import { Court } from "@/models/Court";

export async function GET() {
  try {
    await connectDB();

    const courts = await Court.find();

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
