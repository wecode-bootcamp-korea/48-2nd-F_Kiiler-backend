const userService = require('../services/user.service');
const { catchAsync } = require('../utils/error');

const signUp = catchAsync(async (req, res) => {
  const { email, password, agreeApp, agreeSms, agreeEmail } = req.body;

  await userService.signUp(email, password, agreeApp, agreeSms, agreeEmail);

  res.status(201).json({ message: 'user is created' });
});

const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const accessToken = await userService.signIn(email, password);

  res.status(200).json({ accessToken });
});

module.exports = { signUp, signIn };
