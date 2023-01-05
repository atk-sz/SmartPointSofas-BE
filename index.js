// import the libraries
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

// Initiate the express app
const app = express();

// Port & other env constants
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(
  express.json({
    limit: "3gb",
  })
);

//connecting to db
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_DB_PASS)
  .then(() => console.log("Connected!"));

fs.readdirSync("./routes").map((route) =>
  app.use(require("./routes/" + route))
);

app.listen(PORT, () =>
  console.log(`Express server is running on port: ${PORT}`)
);
