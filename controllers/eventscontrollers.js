const { Event } = require("../models");
const { User } = require("../models");
const { catchAsync } = require("../utils");

exports.addEvent = catchAsync(async (req, res) => {
  const { title, description, date, organizer } = req.body;
  const newEvent = await Event.create({ title, description, date, organizer });

  res.status(201).json(newEvent);
});

exports.findParticipants = catchAsync(async (req, res) => {
  const { _id } = req.query;
  const newEvent = await User.find({
    participate: {
      $elemMatch: { eventId: _id },
    },
  });

  res.status(201).json(newEvent);
});

exports.getEvents = catchAsync(async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  const events = await Event.find({}, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  res.status(201).json(events);
});
