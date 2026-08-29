import mongoose from "mongoose";
import { User } from "@/models/User";
import { Court } from "@/models/Court";
import { Reservation } from "@/models/Reservation";
import { Payment } from "@/models/Payment";
import { OtpCode } from "@/models/OtpCode";
import { env } from "./env";
import { logger } from "./logger";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as unknown as {
  mongooseCache?: MongooseCache;
};

const cached: MongooseCache = globalForMongoose.mongooseCache ?? {
  conn: null,
  promise: null,
};

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(env.DATABASE).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
    logger.info("Database connected");
  } catch (err) {
    cached.promise = null;
    logger.error("Database connection failed", err);
    throw new Error("Failed to connect to the database");
  }

  return cached.conn;
}
