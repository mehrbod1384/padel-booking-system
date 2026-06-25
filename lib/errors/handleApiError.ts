import { NextResponse } from "next/server";
import { AppError } from "./AppError";

export function handleApiError(error: any) {
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

  console.log(error);
  console.log(error.message);

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
