import Workout from "../model/workoutModel.js";

// CREATE WORKOUT
export const createWorkout = async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();

    res.status(201).json({
      message: "Workout created successfully",
      workout
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL WORKOUTS (OPTIONAL FILTER BY USER)
export const getWorkouts = async (req, res) => {
  try {
    const filter = req.params.userId
      ? { userId: req.params.userId }
      : {};

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