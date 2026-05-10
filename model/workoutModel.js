import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },

  workoutName: {
    type: String,
    required: true
  },

  workoutType: {
    type: String,
    required: true
  },

  duration: {
    type: Number,
    required: true
  },

  caloriesBurned: {
    type: Number
  },

  date: {
    type: String,
    required: true
  }

});

export default mongoose.model("workouts", workoutSchema);