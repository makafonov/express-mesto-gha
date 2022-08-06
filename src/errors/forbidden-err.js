const { HTTP_FORBIDDEN } = require('../constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
