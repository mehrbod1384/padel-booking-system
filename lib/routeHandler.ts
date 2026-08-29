import type { NextResponse } from "next/server";
import type { ZodTypeAny } from "zod";
import { connectDB } from "./db";
import { requireUser } from "./auth";
import { handleApiError } from "./errors/handleApiError";
import { AppError } from "./errors/AppError";

type HandlerContext = {
  user?: any;
  body?: unknown;
  params?: any;
};

type RouteOptions = {
  schema?: ZodTypeAny;
  auth?: boolean;
};

export function routeHandler(
  handler: (
    req: Request,
    ctx: HandlerContext,
  ) => Promise<Response | NextResponse>,
  options: RouteOptions = {},
) {
  return async function (
    req: Request,
    ctx?: { params?: any },
  ): Promise<Response> {
    try {
      await connectDB();

      let body: unknown;

      if (options.schema) {
        const json = await req.json().catch(() => ({}));
        const parsed = options.schema.safeParse(json);

        if (!parsed.success) {
          throw new AppError(
            parsed.error.issues[0]?.message ?? "Invalid request body",
            400,
          );
        }

        body = parsed.data;
      }

      let user: any;

      if (options.auth) {
        user = await requireUser();
      }

      return (await handler(req, {
        user,
        body,
        params: ctx?.params,
      })) as Response;
    } catch (err) {
      return handleApiError(err);
    }
  };
}
