const got = require('got');

const { pokedex } = require('../config');

const __callAPI = async (path, method, additionalHeaders = {}) => {
  try {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const options = {
      prefixUrl: pokedex.api,
      method,
      responseType: 'json',
      headers: {
        ...defaultHeaders,
        additionalHeaders,
      },
    };

    const result = await got(path, options);

    return result.body;
  } catch (error) {
    return error;
  }
};

const getList = (resourceName, offset, limit) => {
  const path = `${resourceName}?offset=${offset}&limit=${limit}`;
  return __callAPI(path, 'GET');
};

const getDetail = (resourceName, resourceId) => {
  const path = `${resourceName}/${resourceId}`;
  return __callAPI(path, 'GET');
};

module.exports = {
  getList,
  getDetail,
};
