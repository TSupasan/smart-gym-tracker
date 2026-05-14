import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  createReminder,
  getReminders,
  deleteReminder
} from "../controller/reminderController.js";

const route = express.Router();

route.post("/create", protect, createReminder);

route.get("/getall", protect, getReminders);

route.delete("/delete/:id", protect, deleteReminder);

export default route;