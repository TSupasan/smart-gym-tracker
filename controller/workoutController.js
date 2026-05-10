import Workout from "../model/workoutModel.js";


// CREATE WORKOUT //Integrating workout routes with controllers and testing endpoints
export const createWorkout = async (req, res) => {

  try {

    const workout = new Workout(req.body);

    await workout.save();

    res.status(201).json({
      message: "Workout created successfully",
      workout
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


// GET ALL WORKOUTS
export const getWorkouts = async (req, res) => {

  try {

    const workouts = await Workout.find();

    res.status(200).json(workouts);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

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

    res.status(200).json(updatedWorkout);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


// DELETE WORKOUT
export const deleteWorkout = async (req, res) => {

  try {

    await Workout.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Workout deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};