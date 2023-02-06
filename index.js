const express = require("express");
const app = express();
const mongoose = require("mongoose");
/////////////////// Coros Origin Configuraion /////////////////////////////
const cors = require("cors");
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
/////////////////// Data Parsers /////////////////////////////
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ parameterLimit: 100000, limit: "50mb" }));

///////////////////DATABASE  CONFIGURATION  ///////////////////
const db = require("./Config/db").mongodbOnline;

///////////// PORT ENVOIRMENT //////////////////
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(db);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//Connect to the database before listening
const PORT = process.env.PORT || 5000;
connectDB().then((conn) => {
  global.mongodbconndbs = conn.connection;
  //Routes go heress
  app.use("/api", cors(corsOptions), require("./Routes/index"));
  app.use("/image", cors(corsOptions), require("./storage/file"));
  app.all("*", (req, res) => {
    res.json({ "every thing": "is awesome" });
  });
  app.listen(PORT, () => {
    console.log(`listening for requests ${PORT}`);
  });
});
