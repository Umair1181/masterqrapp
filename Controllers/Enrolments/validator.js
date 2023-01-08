const { GeneralConrtller } = require("../generalController");

const post = (req, res, next) => {
  const data = req.body;
  if (!data?.student) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Invalid Student",
      null,
      false
    );
  }
  if (!data?.course) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Invalid Course",
      null,
      false
    );
  }
  next();
};

const update = (req, res, next) => {
  const data = req.body;
  if (!data?.student) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Invalid Student",
      null,
      false
    );
  }
  if (!data?.course) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Invalid Course",
      null,
      false
    );
  }
  next();
};

module.exports = {
  post,
  update,
};
