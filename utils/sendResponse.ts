import { NextResponse } from "next/server";

export function sendResponse<T>(message?: string, data: T) {
  return NextResponse.json({
    success: true,
    message,
    data,
  });
}
