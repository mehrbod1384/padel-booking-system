import { verifyOtp } from "@/features/auth/services/authService";
import { routeHandler } from "@/lib/routeHandler";
import { verifyOtpSchema } from "@/lib/validation";

export const POST = routeHandler(
  async (_req, { body }) => {
    const { phone, code } = body as { phone: string; code: string };

    const user = await verifyOtp(phone, code);

    return Response.json({
      success: true,
      message: "Login successful",
      data: user,
    });
  },
  { schema: verifyOtpSchema },
);
