import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    email: String,
    cartItems: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

const userModel =
  mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;

