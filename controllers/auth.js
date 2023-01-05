const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const privateKey = process.env.PRIVATEKEY;

exports.signUp = async (req, res) => {
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
};

exports.signIn = async (req, res) => {
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
};
