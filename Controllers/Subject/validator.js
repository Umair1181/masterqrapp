const { GeneralConrtller } = require("../generalController");

const post = (req, res, next) => {
  const data = req.body;
  if (!data?.name) {
    return GeneralConrtller.ResponseObj(res, 400, "Invalid Name", null, false);
  }
  if (!data?.subCode) {
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

const update = (req, res, next) => {
  const data = req.body;
  if (!data?.name) {
    return GeneralConrtller.ResponseObj(res, 400, "Invalid Name", null, false);
  }
  if (!data?._id) {
    return GeneralConrtller.ResponseObj(res, 400, "Invalid Id", null, false);
  }
  if (!data?.subCode) {
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
