import express from "express";

console.log("Workout routes loaded");

import {
  createWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout
} from "../controller/workoutController.js";

const route = express.Router();

route.post("/create", createWorkout);

route.get("/getall", getWorkouts);

route.put("/update/:id", updateWorkout);

route.delete("/delete/:id", deleteWorkout);

export default route;