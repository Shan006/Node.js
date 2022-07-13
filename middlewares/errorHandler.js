const customApiError = require("../errors/custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
  //   console.log(err);
  if (err instanceof customApiError) {
    return res.status(err.status).json({ msg: err.message });
  }
  res.status(500).json({ msg: "Something Went Wrong , Please Try again" });
};
module.exports = errorHandlerMiddleware;

//  if we send error in the next it will automatically land in the err argument.
