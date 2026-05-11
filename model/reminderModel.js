import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },

  reminderType: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  reminderTime: {
    type: String,
    required: true
  },

  date: {
    type: String,
    required: true
  }

});

export default mongoose.model("reminders", reminderSchema);