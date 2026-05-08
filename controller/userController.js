import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// REGISTER USER
export const registerUser = async (req, res) => {

  try {

    const { name, email, password, height, weight } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // BMI Calculation
    const heightInMeter = height / 100;

    const bmi = (weight / (heightInMeter * heightInMeter)).toFixed(1);

    let bmiStatus = "";

    if (bmi < 18.5) {
      bmiStatus = "Underweight";
    }
    else if (bmi >= 18.5 && bmi < 25) {
      bmiStatus = "Normal";
    }
    else if (bmi >= 25 && bmi < 30) {
      bmiStatus = "Overweight";
    }
    else {
      bmiStatus = "Obese";
    }

    // Encrypt Password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      height,
      weight,
      bmi,
      bmiStatus
    });

    await newUser.save();

    res.status(201).json({
      message: "User Registered Successfully",
      user: newUser
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


// LOGIN USER
export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};