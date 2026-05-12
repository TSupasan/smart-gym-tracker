import express from "express";
import {
  createWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout
} from "../controller/workoutController.js";

const router = express.Router();

// CREATE
router.post("/create", createWorkout);

// GET ALL (NO userId)
router.get("/getall", getWorkouts);

// GET BY USER ID (OPTIONAL)
router.get("/getall/:userId", getWorkouts);

// UPDATE
router.put("/update/:id", updateWorkout);

// DELETE
router.delete("/delete/:id", deleteWorkout);

export default router;