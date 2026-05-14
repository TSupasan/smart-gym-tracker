import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  height: {
    type: Number,
    required: true,
  },

  weight: {
    type: Number,
    required: true,
  },

  bmi: {
    type: Number,
  },

  bmiStatus: {
    type: String,
  },

  role: {
    type: String,
    enum: ["user", "coach"],
    default: "user",
  },

});

export default mongoose.model("users", userSchema);