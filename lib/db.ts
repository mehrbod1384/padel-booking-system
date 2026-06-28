import mongoose from "mongoose";
import { User } from "@/models/User";
import { Court } from "@/models/Court";
import { Reservation } from "@/models/Reservation";

const DATABASE = process.env.DATABASE!;

if (!DATABASE) throw new Error("Please define DATABASE");

let cached = global.mongooseTypes;

if (!cached) {
  cached = global.mongooseTypes = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  try {
    if (cached.conn) return cached.conn;

    if (!cached.promise) cached.promise = mongoose.connect(DATABASE);

    cached.conn = await cached.promise;

    return cached.conn;
  } catch (err) {
    console.log("dataBase error :", err);
  }
}
