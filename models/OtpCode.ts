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
  },
  {
    timestamps: true,
  },
);

export const OtpCode = models.OtpCode || model("OtpCode", otpCodeSchema);
