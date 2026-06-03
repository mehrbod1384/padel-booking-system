import { NextResponse } from "next/server";
import { AppError } from "./AppError";

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

  console.error(error);

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
