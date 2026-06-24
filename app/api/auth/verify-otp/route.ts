import { verifyOtp } from "@/features/auth/services/authService";
import { connectDB } from "@/lib/db";
import { handleApiError } from "@/lib/errors/handleApiError";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { phone, code } = body;

    const user = await verifyOtp(phone, code);

    return Response.json({
      success: true,
      message: "Login successful",
      data: user,
    });
  } catch (err) {
    return handleApiError(err);
  }
}
