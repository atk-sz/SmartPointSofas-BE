// import the libraries
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const User = require("./models/user");

// Initiate the express app
const app = express();

// Port & other env constants
const PORT = process.env.PORT || 4000;
const privateKey = process.env.PRIVATEKEY;

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

app.post("/signup", async (req, res) => {
  let { name, phone, password } = req.body;

  const existingUser = await User.findOne({ phone });
  if (existingUser) return res.status(400).send("User Already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  let newUser = new User({
    name,
    phone,
    hash_password: hashedPassword,
  });
  await newUser.save();

  jwt.sign(User.toClientObject(newUser), privateKey, (err, token) => {
    if (err) return res.status(400).send(err.message);
    return res.json({
      message: "User added successfully",
      user: User.toClientObject(newUser),
      access_token: token,
    });
  });
});

app.post("/signin", async (req, res) => {
  let { phone, password } = req.body;

  const foundUser = await User.findOne({ phone });
  if (!foundUser) return res.status(404).send("User not found");

  const match = await bcrypt.compare(password, foundUser.hash_password);
  if (match) {
    jwt.sign(User.toClientObject(foundUser), privateKey, (err, token) => {
      if (err) return res.status(400).send(err.message);
      return res.json({
        message: "Login Successfully",
        user: User.toClientObject(foundUser),
        access_token: token,
      });
    });
  } else res.status(400).send("Invalid Password");
});

app.post("/authcheck", async (req, res) => {
  let { access_token } = req.headers;

  jwt.verify(access_token, privateKey, function (err, decoded) {
    if (err) return res.status(400).send("Invalid Access");
    return res.json({ w: "working fine", decoded });
  });
});

app.listen(PORT, () =>
  console.log(`Express server is running on port: ${PORT}`)
);
