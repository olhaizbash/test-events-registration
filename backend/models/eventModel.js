const { model, Schema } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = model("Event", eventSchema);
eventSchema.post("save", handleMongooseError);
module.exports = Product;
