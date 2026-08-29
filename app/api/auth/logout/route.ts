import { logout } from "@/features/auth/services/authService";
import { routeHandler } from "@/lib/routeHandler";

export const POST = routeHandler(async () => {
  await logout();

  return Response.json({
    success: true,
    message: "Logged out successfully",
  });
});
