import express from "express";

import {
  createReminder,
  getReminders,
  deleteReminder
} from "../controller/reminderController.js";

const route = express.Router();

route.post("/create", createReminder);

route.get("/getall", getReminders);

route.delete("/delete/:id", deleteReminder);

export default route;