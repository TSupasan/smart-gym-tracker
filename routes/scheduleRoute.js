import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

import {
  createSchedule,
  getSchedules,
  updateSchedule,
  deleteSchedule
} from "../controller/scheduleController.js";

const route = express.Router();

route.post("/create", protect, authorizeRoles("coach"), createSchedule);

route.get("/getall", protect, getSchedules);

route.put("/update/:id", protect, authorizeRoles("coach"), updateSchedule);

route.delete("/delete/:id", protect, authorizeRoles("coach"), deleteSchedule);

export default route;