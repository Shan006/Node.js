class customApiErrors extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCostumError = (msg, statusCode) => {
  return new customApiErrors(msg, statusCode);
};

module.exports = { createCostumError, customApiErrors };
