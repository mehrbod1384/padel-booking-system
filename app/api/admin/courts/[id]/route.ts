import {
  deleteCourt,
  updateCourt,
} from "@/features/court/services/courtServices";
import { routeHandler } from "@/lib/routeHandler";
import { updateCourtSchema } from "@/lib/validation";

import type { UpdateCourtBody } from "@/features/court/types";

export const PATCH = routeHandler(
  async (_req, { body, params }) => {
    const { id } = (await params) as { id: string };

    const court = await updateCourt(id, body as UpdateCourtBody);

    return Response.json({
      success: true,
      court,
    });
  },
  { schema: updateCourtSchema },
);

export const DELETE = routeHandler(async (_req, { params }) => {
  const { id } = (await params) as { id: string };

  await deleteCourt(id);

  return Response.json({
    success: true,
  });
});
