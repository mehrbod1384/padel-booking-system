import { sendOtp } from "@/features/auth/services/authService";
import { routeHandler } from "@/lib/routeHandler";
import { sendOtpSchema } from "@/lib/validation";

export const POST = routeHandler(
  async (_req, { body }) => {
    const { phone } = body as { phone: string };

    const otp = await sendOtp(phone);

    return Response.json({
      success: true,
      message: "OTP sent successfully",
      data: otp,
    });
  },
  { schema: sendOtpSchema },
);
