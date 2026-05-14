import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  addProgress,
  getProgress
} from "../controller/progressController.js";

const route = express.Router();

route.post("/add", protect, addProgress);

route.get("/getall", protect, getProgress);

export default route;