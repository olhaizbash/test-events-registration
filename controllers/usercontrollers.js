const { User } = require("../models");
const { catchAsync } = require("../utils");
require("dotenv").config();

exports.registration = catchAsync(async (req, res, next) => {
  const { email, fullName, dateOfBirth, know, participate } = req.body;
  console.log(req.body);

  const userExistsWithEmail = await User.exists({
    email: email,
  });

  if (userExistsWithEmail) {
    const userLog = await User.findOne({ email });
    await User.findByIdAndUpdate(
      userLog._id,
      { participate: [...userLog.participate, ...req.body.participate] },
      { new: true }
    );
    res.json({
      user: {
        email,
        fullName: userLog.fullName,
        dateOfBirth: userLog.dateOfBirth,
        know: userLog.know,
        participate: [...userLog.participate, ...req.body.participate],
      },
    });
  } else {
    const newUser = await User.create({
      email,
      fullName,
      dateOfBirth,
      know,
      participate: [participate],
    });

    res.status(201).json({
      user: {
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        dateOfBirth: newUser.dateOfBirth,
        know: newUser.know,
        participate: newUser.participate,
      },
    });
  }
});
