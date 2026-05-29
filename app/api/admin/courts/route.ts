import { createCourt, getAllCourt } from "@/features/court/courtServices";
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

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, price } = body;

    if (!name || !price) {
      return Response.json(
        { success: false, message: "Missing fields" },
        { status: 400 },
      );
    }

    const court = await createCourt(name, price);

    return Response.json({
      success: true,
      court,
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        message: "Server error",
        err,
      },
      { status: 500 },
    );
  }
}
