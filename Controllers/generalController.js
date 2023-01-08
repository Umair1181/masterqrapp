const bcrypt = require("bcryptjs");

const PrepPassword = async (data) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(data, salt);

  if (hash) {
    return hash;
  } else {
    return false;
  }
};
const ComparePassword = async (inPassword, hash) => {
  let resp = await bcrypt.compare(`${inPassword}`, `${hash}`); // true
  console.log("resp: ", resp);
  if (resp) {
    return true;
  } else {
    return false;
  }
};

const ResponseObj = (res, code, msg, data, success, total) => {
  return res.status(code).json({
    msg: msg ?? "",
    data,
    success: success ? true : false,
    total: total ?? null,
  });
};

const handleError = (err) => {
  const dict = {
    unique: "% already exists.",
    required: "%s is required.",
    min: "%s below minimum.",
    max: "%s above maximum.",
    enum: "%s is not an allowed value.",
  };

  return Object.keys(err.errors).map((key) => {
    const props = err.errors[key].properties;
    return dict.hasOwnProperty(props.kind)
      ? require("util").format(dict[props.kind], props.path)
      : props.hasOwnProperty("message")
      ? props.message.replace("Path ", "").replace("`", "").replace("`", "")
      : props.type;
  });
};

module.exports = {
  GeneralConrtller: { PrepPassword, ComparePassword, ResponseObj, handleError },
};
