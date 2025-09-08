const handler = (fn) => {
  return (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.error("Caught in handler:", err);
      next(err);
    });
};

module.exports = handler;
