import { getUserFromToken } from "@/lib/auth";
import { routeHandler } from "@/lib/routeHandler";

export const GET = routeHandler(async () => {
  const user = await getUserFromToken();

  return Response.json({
    success: true,
    message: "Profile retrieved successfully",
    data: user,
  });
});
