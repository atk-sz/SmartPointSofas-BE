var jwt = require("jsonwebtoken");

exports.authcheck = async (req, res, next) => {
  let { access_token } = req.headers;

  jwt.verify(access_token, process.env.PRIVATEKEY, function (err, decoded) {
    if (err) return res.status(400).send("Invalid Access");
    req.user = decoded;
    next();
  });
};
