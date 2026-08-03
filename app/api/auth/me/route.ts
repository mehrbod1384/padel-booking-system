import { getUserFromToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { handleApiError } from "@/lib/errors/handleApiError";

export async function GET() {
  try {
    await connectDB();

    const user = await getUserFromToken();

    return Response.json({
      success: true,
      message: "Profile get successfuly",
      data: user,
    });
  } catch (err) {
    return handleApiError(err);
  }
}
