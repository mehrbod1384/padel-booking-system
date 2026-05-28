import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    return Response.json({
      success: true,
      message: "Database connected",
    });
  } catch (err) {
    return Response.json({
      success: false,
      err,
    });
  }
}
