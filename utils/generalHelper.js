const moment = require('moment');

const formatDate = (date) => moment(date).format();

module.exports = { formatDate };
