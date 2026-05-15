import Workout from "../model/workoutModel.js";

// CREATE WORKOUT
export const createWorkout = async (req, res) => {
  try {
    const { workoutName, focus, duration, calories, date, notes } = req.body;

    const workout = new Workout({
      userId: req.user._id,
      workoutName,
      workoutType: focus,
      duration: Number(duration),
      caloriesBurned: Number(calories),
      date: date || new Date().toLocaleDateString(),
      notes
    });

    await workout.save();

    res.status(201).json({
      message: "Workout created successfully",
      workout
    });
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).json({ error: error.message });
  }
};

// GET ALL WORKOUTS FOR CURRENT USER
export const getWorkouts = async (req, res) => {
  try {
    const filter = { userId: req.user._id };
    const workouts = await Workout.find(filter);

    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE WORKOUT
export const updateWorkout = async (req, res) => {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE WORKOUT
export const deleteWorkout = async (req, res) => {
  try {
    const deleted = await Workout.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json({
      message: "Workout deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};