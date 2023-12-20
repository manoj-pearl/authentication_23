import mongoose from "mongoose";
// -----------------------------------------------------------------------------------------

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required:[true,"First Name is required"]
    },
    lastName: {
      type: String,
      required:[true,"Last Name is required"]
    },
    email: {
      type: String,
      required:[true,"Email Name is required"]
    },
    password: {
      type: String,
      required:[true,"Password is required"]
    },
    phone: {
      type: String,
      required:[true,"Phone is required"]
    },
  },
  { timestamp: true }
);

export default mongoose.model("User", userSchema);

// ================================ THE END =============================================
