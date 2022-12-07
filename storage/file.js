const Router = require("express").Router();
const { gfs, BUCKET } = require("./index")();

Router.get("/:filename", (req, res) => {
  console.log("Image Downloading");
  console.log(req.params.filename);
  gfs.find({ filename: req.params.filename }).toArray((err, file) => {
    console.log("File");
    console.log(file);
    console.log(err);
    if (!file || file.length === 0) {
      console.log("Inside error");
      return res.json({ msg: "no files" }).status(404);
    }
    // const readStream = gfs.createReadStream(file.filename);
    // readStream.pipe(res);
    console.log("downlading image");
    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
  });
});

module.exports = Router;
