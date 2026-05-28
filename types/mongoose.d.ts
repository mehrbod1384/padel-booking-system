import mongoose from "mongoose";

declare global {
  var mongooseTypes: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}
