import { NextResponse } from "next/server";
import { AppError } from "./AppError";
import { logger } from "../logger";

export function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: error.statusCode,
      },
    );
  }

  logger.error(
    error instanceof Error ? error.message : "Unknown error",
    error,
  );

  return NextResponse.json(
    {
      success: false,
      message: "Internal server error",
    },
    {
      status: 500,
    },
  );
}
