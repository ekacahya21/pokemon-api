const User = require('../../models/user');
const { transformUser } = require('../../utils/transformers');

const users = async () => {
  try {
    const fetchedUsers = await User.find();
    return fetchedUsers.map((user) => transformUser(user));
  } catch (error) {
    return error;
  }
};

const registerUser = async ({ input }) => {
  const userExists = await User.findOne({ username: input.username });
  if (userExists) {
    throw new Error('User already exists');
  }
  try {
    const user = new User({
      email: input.email,
      username: input.username,
      password: input.password,
    });
    return await user.save();
  } catch (error) {
    return error;
  }
};

module.exports = {
  users,
  registerUser,
};
