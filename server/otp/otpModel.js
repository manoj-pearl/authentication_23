import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      trim: true,
      required: [true,"Otp is required"],
    },

    email: {
      type: String,
      trim: true,
      required: [true,"Email is required"],
      pattern: "[a-z0-9]+@[a-z]+.[a-z]{2,3}",
    },

    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);
const otpModel = mongoose.model("otp", otpSchema, "otp");
export default otpModel;
