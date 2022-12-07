const multer = require("multer");
const BUCKET = "uploads";
const mongoose = require("mongoose");

const CreateURL = filename => {
  return IMAGE_GET_BASE_URL + filename;
};
let gfs;

module.exports = () => {
  const mongoURI = require("../Config/db").mongodbOnline;
  const mongo = mongoose.mongo;
  const storageConfig = require("./fileConfig");
  
  gfs = new mongoose.mongo.GridFSBucket(global.mongodbconndbs.db, {
    bucketName: BUCKET
  });
  const upload = multer({
    storage: storageConfig.InitializeStorage(
      mongoURI,
      global.mongodbconndbs,
      mongo
    )
  });

  return {
    upload,
    gfs,
    BUCKET,
    CreateURL
  };
};
