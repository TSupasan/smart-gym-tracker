import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },

  currentWeight: {
    type: Number,
    required: true
  },

  bmi: {
    type: Number,
    required: true
  },

  bmiStatus: {
    type: String,
    required: true
  },

  note: {
    type: String
  },

  date: {
    type: String,
    required: true
  }

});

export default mongoose.model("progress", progressSchema);