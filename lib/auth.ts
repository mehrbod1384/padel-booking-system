import { User } from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { AppError } from "./errors/AppError";

export async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new AppError("Token required", 400);

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

  const user = await User.findById(decoded.userId);

  if (!user) throw new AppError("Unauthorized", 401);

  return user;
}
