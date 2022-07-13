const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error); // this response error is coming from express's built-in error handler
    }
  };
};

module.exports = asyncWrapper;
