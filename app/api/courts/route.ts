import {
  createCourt,
  getAllCourt,
} from "@/features/court/services/courtServices";
import { routeHandler } from "@/lib/routeHandler";
import { createCourtSchema } from "@/lib/validation";

export const GET = routeHandler(async () => {
  const courts = await getAllCourt();

  return Response.json({
    success: true,
    data: courts,
  });
});

export const POST = routeHandler(
  async (_req, { body }) => {
    const { name, price } = body as { name: string; price: number };

    const court = await createCourt(name, price);

    return Response.json({
      success: true,
      court,
    });
  },
  { schema: createCourtSchema },
);
