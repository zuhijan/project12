/* eslint-disable max-classes-per-file */
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
// class UnauthorizedError extends Error {
//   constructor(message) {
//     super(message);
//     this.statusCode = 401;
//   }
// }
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class SuccesError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 200;
  }
}

module.exports = { NotFoundError, ForbiddenError, SuccesError };
