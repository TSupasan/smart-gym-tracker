import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout
} from "../controller/workoutController.js";

const router = express.Router();

// CREATE
router.post("/create", protect, createWorkout);

// GET ALL (NO userId)
router.get("/getall", protect, getWorkouts);

// GET BY USER ID (OPTIONAL)
router.get("/getall/:userId", protect, getWorkouts);

// UPDATE
router.put("/update/:id", protect, updateWorkout);

// DELETE
router.delete("/delete/:id", protect, deleteWorkout);

export default router;