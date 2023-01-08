const { GeneralConrtller } = require("../generalController");
const Subject_Model = require("./model");

const getSingle = async (data) => {
  let gotData = await Subject_Model.findOne(data);
  if (gotData) {
    return gotData;
  } else {
    return false;
  }
};
const post = async (req, res) => {
  const { data } = req.body;
  if (await getSingle({ name: data?.name })) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Subject Name Repeated",
      null,
      false
    );
  }
  if (await getSingle({ subCode: data?.subCode })) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Subject Code Repeated",
      null,
      false
    );
  }
  let newSubject = new Subject_Model({
    name: data?.name,
    subCode: data?.subCode,
  });
  try {
    let createdSubject = await newSubject.save();
    return GeneralConrtller.ResponseObj(
      res,
      200,
      "Subject added Successfully",
      createdSubject,
      true
    );
  } catch (error) {
    return GeneralConrtller.ResponseObj(res, 400, "Failed", error, false);
  }
};

const update = async (req, res) => {
  const { data } = req.body;
  if (await getSingle({ name: data?.name, _id: { $ne: data?._id } })) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Subject Already Exist",
      null,
      false
    );
  }
  if (await getSingle({ subCode: data?.subCode, _id: { $ne: data?._id } })) {
    return GeneralConrtller.ResponseObj(
      res,
      400,
      "Subject Already Exist",
      null,
      false
    );
  }

  let newSubject = new Subject_Model({
    name: data?.name,
    subCode: data?.subCode,
  });
  try {
    let updated = await Subject_Model.findOneAndUpdate(
      {
        _id: data?._id,
      },
      {
        name: data?.name,
        subCode: data?.subCode,
      },
      {
        new: true,
      }
    );
    return GeneralConrtller.ResponseObj(
      res,
      200,
      "Subject Updated Successfully",
      updated,
      true
    );
  } catch (error) {
    return GeneralConrtller.ResponseObj(res, 400, "Failed", error, false);
  }
};

const get = async (req, res) => {
  let data = await Subject_Model.find();
  return GeneralConrtller.ResponseObj(
    res,
    data?.length > 0 ? 200 : 400,
    "Subjects",
    data,
    data?.length > 0 ? true : false
  );
};

const deleteList = async (req, res) => {
  let data = await Subject_Model.deleteMany();
  return GeneralConrtller.ResponseObj(res, 200, "Subjects Deleted", [], true);
};

const deleteSingle = async (req, res) => {
  let _id = req.params._id;
  let data = await Subject_Model.deleteOne({ _id: _id });
  return GeneralConrtller.ResponseObj(res, 200, "Subject Deleted", data, true);
};

module.exports = {
  post,
  update,
  get,
  deleteList,
  deleteSingle,
};
