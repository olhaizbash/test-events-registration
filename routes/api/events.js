const express = require("express");

const router = express.Router();

const app = express();

app.use(express.json());

const { addEvent, findParticipants, getEvents } = require("../../controllers");

router.route("/").get(getEvents).post(addEvent);

router.route("/find").get(findParticipants);

module.exports = router;
