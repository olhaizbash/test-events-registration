const express = require("express");

const router = express.Router();

const app = express();

app.use(express.json());

const { registration } = require("../../controllers");

router.patch("/register", registration);

module.exports = router;
