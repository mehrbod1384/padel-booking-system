import { logout } from "@/features/auth/services/authService";
import { handleApiError } from "@/lib/errors/handleApiError";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await logout();

    return NextResponse.json({
      succuss: true,
      message: "logged out successfuly",
    });
  } catch (err) {
    return handleApiError(err);
  }
}
