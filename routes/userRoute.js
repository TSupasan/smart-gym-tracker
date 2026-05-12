import express from "express";
import User from "../model/userModel.js";

import {
  registerUser,
  loginUser
} from "../controller/userController.js";

const route = express.Router();

// REGISTER
route.post("/register", registerUser);

// LOGIN
route.post("/login", loginUser);

// GET ALL USERS
route.get("/", async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

export default route;