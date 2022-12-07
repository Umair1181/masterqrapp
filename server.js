const express = require("express");
const app = express();
const mongoose = require("mongoose");

/////////////////// Coros Origin Configuraion /////////////////////////////
const cors = require("cors");
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
/////////////////// Data Parsers /////////////////////////////
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ parameterLimit: 100000, limit: "50mb" }));

///////////////////DATABASE  CONFIGURATION  ///////////////////
const db = require("./Config/db").mongodbOnline;
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((m) => {
    global.mongodbconndbs = m.connection;
    console.log("db connected");

    ///////////////// API ROUTES ////////////////
    app.use("/api", cors(corsOptions), require("./Routes/index"));
    app.use("/image", cors(corsOptions), require("./storage/file"));
    // app.use("/api", require("./Routes/attendence"));
    // app.use("/upload", require("./Api/UploadDocs"));

    app.get("/", cors(corsOptions), (req, res) => {
      res.status(200).json({ msg: "server running..." });
    });
  });

///////////// PORT ENVOIRMENT //////////////////
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`SERVER RUNNING AT PORT ${port}`);
});
