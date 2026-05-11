import express from "express";

import {
  addProgress,
  getProgress
} from "../controller/progressController.js";

const route = express.Router();

route.post("/add", addProgress);

route.get("/getall", getProgress);

export default route;