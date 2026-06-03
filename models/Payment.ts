import { Schema, model, models } from "mongoose";

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
      required: true,
    },

    refId: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["INITIATED", "SUCCESS", "FAILED", "EXPIRED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  },
);

export const Payment = models.Payment || model("Payment", paymentSchema);
