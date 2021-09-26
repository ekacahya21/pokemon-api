const User = require('../models/user');

const tokenExtractor = (authHeader) => {
  const authHeaderVal = authHeader.split(' ');
  const token = authHeaderVal[1];
  return token || '';
};

const validateAuth = async (request) => {
  if (!request.isAuthenticated) {
    throw new Error('Unauthorized request');
  }

  try {
    const user = await User.findById(request.userId);

    if (!user) {
      throw new Error('Unauthorized request');
    }

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  tokenExtractor,
  validateAuth,
};
