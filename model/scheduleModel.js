import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },

  day: {
    type: String,
    required: true
  },

  workoutPlan: {
    type: String,
    required: true
  },

  startTime: {
    type: String,
    required: true
  },

  duration: {
    type: Number,
    required: true
  }

});

export default mongoose.model("schedules", scheduleSchema);