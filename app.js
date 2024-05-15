const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config({ path: "./envs/.env" });
const mongoose = require("mongoose");

const userRouter = require("./routes/api/user");

const eventsRouter = require("./routes/api/events");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
mongoose
  .connect(process.env.MONGO_URL)
  .then((con) => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/user", userRouter);
app.use("/api/events", eventsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
