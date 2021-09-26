const jwt = require('jsonwebtoken');

const { auth } = require('../config');
const { tokenExtractor } = require('../utils/authHelper');

module.exports = (req, res, next) => {
  req.isAuthenticated = false;

  const authHeader = req.get('Authorization');
  if (authHeader) {
    const token = tokenExtractor(authHeader);
    if (token) {
      try {
        const decoded = jwt.verify(token, auth.secret);

        if (decoded && decoded.userId) {
          req.isAuthenticated = true;
          req.userId = decoded.userId;
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Authenticated failed');
      }
    }
  }

  return next();
};
