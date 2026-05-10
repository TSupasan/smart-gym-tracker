import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import workoutRoute from "./routes/workoutRoute.js";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

// Debug (optional - you can remove later)
console.log("PORT:", PORT);
console.log("MONGO URL:", MONGOURL);

// MongoDB connection
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });


app.use("/api/user", userRoute);

app.use("/api/workout", workoutRoute);
// Test route
app.get("/", (req, res) => {
  res.send("Smart Gym Tracker API Running");
});