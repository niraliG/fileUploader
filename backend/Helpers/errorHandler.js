const handleError = (err, res) => {
  let { statusCode } = err;
  const { message } = err;
  if (!statusCode) {
    statusCode = 500;
  }
  res.status(statusCode).json({
    errors: [
      {
        status: statusCode,
        title: message,
      },
    ],
  });
};

module.exports = {
  handleError,
};
