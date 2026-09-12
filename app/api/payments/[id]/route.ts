import { routeHandler } from "@/lib/routeHandler";
import { Payment } from "@/models/Payment";

export const GET = routeHandler(async (_req, { params }) => {
  const { id } = (await params) as { id: string };

  const payment = await Payment.findById(id);

  return Response.json({
    success: true,
    data: payment,
  });
});
