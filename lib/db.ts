import mongoose from "mongoose";

const DATABASE = process.env.DATABASE;

if (!DATABASE) throw new Error("Please define DATABASE");

let cached = global.mongooseTypes;

if (!cached) {
  cached = global.mongooseTypes = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) cached.promise = mongoose.connect(DATABASE);

  cached.conn = await cached.promise;

  return cached.conn;
}
