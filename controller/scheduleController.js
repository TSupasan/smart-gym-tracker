import Schedule from "../model/scheduleModel.js";


// CREATE SCHEDULE
export const createSchedule = async (req, res) => {

  try {

    const schedule = new Schedule({
      ...req.body,
      coachId: req.user._id
    });

    await schedule.save();

    res.status(201).json({
      message: "Schedule created successfully",
      schedule
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


// GET ALL SCHEDULES
export const getSchedules = async (req, res) => {

  try {

    const { category } = req.query;
    let filter = {};
    if (category && category !== 'All') {
      filter.targetCategory = category;
    }
    const schedules = await Schedule.find(filter);

    res.status(200).json(schedules);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


// UPDATE SCHEDULE
export const updateSchedule = async (req, res) => {

  try {

    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedSchedule);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


// DELETE SCHEDULE
export const deleteSchedule = async (req, res) => {

  try {

    await Schedule.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Schedule deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};