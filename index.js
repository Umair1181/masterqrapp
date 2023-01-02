const express = require("express");
const app = express();
const mongoose = require("mongoose");
/////////////////// Coros Origin Configuraion /////////////////////////////
// const cors = require("cors");
// const corsOptions = {
//   origin: "*",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
/////////////////// Data Parsers /////////////////////////////
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ parameterLimit: 100000, limit: "50mb" }));

///////////////////DATABASE  CONFIGURATION  ///////////////////
const db = require("./Config/db").mongodbOnline;
mongoose.set("strictQuery", false);
console.log("before db connection ");
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((m) => {
    global.mongodbconndbs = m.connection;
    console.log("db connected");

    ///////////////// API ROUTES ////////////////
    app.use("/api", require("./Routes/index"));
    app.use("/image", require("./storage/file"));
    // app.use("/api", require("./Routes/attendence"));
    // app.use("/upload", require("./Api/UploadDocs"));

    app.get("/", (req, res) => {
      console.log("default root ");
      // return res.status(200).json({ msg: "server running..." });
      res.send("Server Runing");
    });
  })
  .catch((err) => {
    console.log("Db Connection Error");
    console.log(err.response);
  });

///////////// PORT ENVOIRMENT //////////////////
const port = process.env.PORT || 5000;
const servera = app.listen(port, () => {
  console.log(`SERVER RUNNING AT PORT ${port}`);
});
