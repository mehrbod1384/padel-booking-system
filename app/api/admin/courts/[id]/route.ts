import {
  deleteCourt,
  updateCourt,
} from "@/features/court/services/courtServices";
import { routeHandler } from "@/lib/routeHandler";
import { updateCourtSchema } from "@/lib/validation";

export const PATCH = routeHandler(
  async (_req, { body, params }) => {
    const { id } = await params;

    const court = await updateCourt(id, body as any);

    return Response.json({
      success: true,
      court,
    });
  },
  { schema: updateCourtSchema },
);

export const DELETE = routeHandler(async (_req, { params }) => {
  const { id } = await params;

  await deleteCourt(id);

  return Response.json({
    success: true,
  });
});
