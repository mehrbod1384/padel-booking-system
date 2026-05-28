import mongoose, { Schema, model, models } from "mongoose";

const paymentSchema = new Schema(
  {
    reservation: {
      type: Schema.Types.ObjectId,
      ref: "Reservation",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    authority: {
      type: String,
    },

    refId: {
      type: String,
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  },
);

export const Payment = models.Payment || model("Payment", paymentSchema);
