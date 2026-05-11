import Progress from "../model/progressModel.js";
import User from "../model/userModel.js";


// ADD PROGRESS
export const addProgress = async (req, res) => {

  try {

    const { userId, currentWeight, note, date } = req.body;

    // Find User
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // BMI Calculation
    const heightInMeter = user.height / 100;

    const bmi = (
      currentWeight /
      (heightInMeter * heightInMeter)
    ).toFixed(1);

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

    const progress = new Progress({
      userId,
      currentWeight,
      bmi,
      bmiStatus,
      note,
      date
    });

    await progress.save();

    res.status(201).json({
      message: "Progress added successfully",
      progress
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


// GET ALL PROGRESS
export const getProgress = async (req, res) => {

  try {

    const progress = await Progress.find();

    res.status(200).json(progress);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};