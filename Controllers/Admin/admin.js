const { GeneralConrtller } = require("../generalController");
const Admin_Model = require("./model");
const login = async (req, res) => {
  let data = req.body;
  console.log("input: ", data);
  let fUser = await Admin_Model.findOne({ email: data?.email });
  if (fUser) {
    let verfied = await GeneralConrtller.ComparePassword(
      data?.password,
      fUser?.password
    );
    if (verfied) {
      return res
        .status(200)
        .json({ msg: "Loged In Successfully", success: true, results: fUser });
    } else {
      return res
        .status(200)
        .json({ msg: "Invalid Password", success: false, results: null });
    }
  } else {
    return res.status(200).json({
      msg: "Invalid Email",
      success: false,
      results: null,
    });
  }
};

const addAdmin = async (req, res) => {
  let generatedPass = await GeneralConrtller.PrepPassword(req.body.pass);
  let newAdmin = Admin_Model({
    email: req.body.email,
    password: generatedPass,
  });
  let _saved = await newAdmin.save();
  return GeneralConrtller.ResponseObj(res, 200, "Success", _saved, true);
};

module.exports = { login, addAdmin };
