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
    const court = await Court.create({
      name,
      price,
    });

    return Response.json({
      success: true,
      court,
    });
  } catch (err) {
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
