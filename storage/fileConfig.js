const Grid = require("gridfs-stream");
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");
const BUCKET = "uploads";

const InitializeStorage = (mongoURI, db, mongo) => {
  const martStorage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        require("crypto").randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename =
            buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: BUCKET,
          };
          resolve(fileInfo);
        });
      });
    },
  });
  return martStorage;
};
module.exports = {
  InitializeStorage,
};
