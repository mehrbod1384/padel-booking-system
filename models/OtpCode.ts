import { Schema, model, models } from "mongoose";

const otpCodeSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    attempts: {
      type: Number,
      default: 0,
    },

    lockedUntil: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

otpCodeSchema.index({ phone: 1 });

export const OtpCode = models.OtpCode || model("OtpCode", otpCodeSchema);
