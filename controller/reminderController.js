import Reminder from "../model/reminderModel.js";


// CREATE REMINDER
export const createReminder = async (req, res) => {

  try {

    const reminder = new Reminder(req.body);

    await reminder.save();

    res.status(201).json({
      message: "Reminder created successfully",
      reminder
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


// GET ALL REMINDERS
export const getReminders = async (req, res) => {

  try {

    const reminders = await Reminder.find();

    res.status(200).json(reminders);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


// DELETE REMINDER
export const deleteReminder = async (req, res) => {

  try {

    await Reminder.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Reminder deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};