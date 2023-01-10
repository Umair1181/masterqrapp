const { GeneralConrtller } = require("../generalController");

const post = (req, res, next) => {
  const data = req.body;
  if (!data?.title) {
    return GeneralConrtller.ResponseObj(res, 400, "Invalid Title", null, false);
  }
  if (!data?.courseCode) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Invalid Course Code",
      null,
      false
    );
  }
  if (!data?.subjectId) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Invalid Subject Id",
      null,
      false
    );
  }
  if (!data?.creditHours) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Invalid Credit Hours",
      null,
      false
    );
  }

  next();
};

const update = (req, res, next) => {
  let courseId = req.params._id;
  const data = req.body;
  if (!courseId) {
    return GeneralConrtller.ResponseObj(res, 400, "Invalid Id", null, false);
  }
  if (!data?.courseCode) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Invalid Subject Code",
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
