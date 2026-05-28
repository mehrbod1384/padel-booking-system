import mongoose, { Schema, model, models } from "mongoose";

const reservationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    court: {
      type: Schema.Types.ObjectId,
      ref: "Court",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    slot: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "EXPIRES"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  },
);

reservationSchema.index(
  {
    court: 1,
    date: 1,
    slot: 1,
  },
  {
    unique: true,
  },
);

export const Reservation =
  models.Reservation || model("Reservation", reservationSchema);
