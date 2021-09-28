const jwt = require('jsonwebtoken');
const moment = require('moment');
const { compareSync } = require('bcryptjs');

const User = require('../../models/user');
const { auth } = require('../../config');
const { transformUser } = require('../../utils/transformers');

const users = async () => {
  try {
    const fetchedUsers = await User.find();
    return fetchedUsers.map((user) => transformUser(user));
  } catch (error) {
    return error;
  }
};

const login = async ({ userID, password }) => {
  try {
    const user = await User.findOne({ $or: [{ email: userID }, { username: userID }] });
    if (!user) {
      throw new Error("User doesn't exist!");
    }
    const isEqual = compareSync(password, user.password);
    if (!isEqual) {
      throw new Error('Incorrect password');
    }

    const expiry = auth.expiry.split(' ');
    const token = jwt.sign({ userId: user.id, email: user.email, username: user.username }, auth.secret, {
      expiresIn: auth.expiry,
    });

    return {
      token,
      expiredAt: moment().add(expiry[0], expiry[1]).format(),
    };
  } catch (error) {
    return error;
  }
};

const signUp = async ({ input }) => {
  try {
    const userExists = await User.findOne({ username: input.username });
    if (userExists) {
      throw new Error('User already exists');
    }
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
  login,
  users,
  signUp,
};
