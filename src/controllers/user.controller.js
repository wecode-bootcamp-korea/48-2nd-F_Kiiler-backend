const userService = require("../services/user.service");
const { catchAsync } = require("../utils/error");

const signUp = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const result = await userService.signUp(email, password);
  console.log(email);
  res.status(201).json({ message: "user is created" });
});

module.exports = { signUp };
