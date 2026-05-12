import express from "express";

import {
  createSchedule,
  getSchedules,
  updateSchedule,
  deleteSchedule
} from "../controller/scheduleController.js";

const route = express.Router();

route.post("/create", createSchedule);

route.get("/getall", getSchedules);

route.put("/update/:id", updateSchedule);

route.delete("/delete/:id", deleteSchedule);

export default route;