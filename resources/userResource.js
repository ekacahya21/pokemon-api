const User = require('../models/user');

const getUserById = (id) => User.findById(id);

module.exports = {
  getUserById,
};
