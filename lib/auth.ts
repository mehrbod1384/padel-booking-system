import { User } from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { AppError } from "./errors/AppError";
import { logger } from "./logger";

export async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId);

    return user;
  } catch (err) {
    logger.error("Failed to authenticate user from token", err);
    return null;
  }
}

export async function requireUser() {
  const user = await getUserFromToken();

  if (!user) throw new AppError("Unauthorized", 401);

  return user;
}
