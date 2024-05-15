const {
  addEvent,
  findParticipants,
  getEvents,
} = require("./eventscontrollers");

const { registration } = require("./usercontrollers");

module.exports = {
  registration,
  addEvent,
  findParticipants,
  getEvents,
};
