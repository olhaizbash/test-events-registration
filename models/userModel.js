const { model, Schema } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: false,
      default: "",
    },
    know: {
      type: String,
      enum: ["social", "friend", "own"],
      required: true,
    },
    participate: [
      {
        eventId: {
          type: Schema.Types.ObjectId,
          ref: "Event",
          required: true,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const User = model("User", userSchema);
userSchema.post("save", handleMongooseError);
module.exports = User;
