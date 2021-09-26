const { hashSync } = require('bcryptjs');

const encrypt = (plain) => hashSync(plain, 12);

module.exports = {
  encrypt,
};
