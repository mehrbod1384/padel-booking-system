import { sendOtp } from "@/features/auth/services/authService";
import { connectDB } from "@/lib/db";
import { handleApiError } from "@/lib/errors/handleApiError";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { phone } = body;

    const otp = await sendOtp(phone);

    return Response.json({
      success: true,
      message: "OTP sent successfuly",
      data: otp,
    });
  } catch (err) {
    return handleApiError(err);
  }
}
