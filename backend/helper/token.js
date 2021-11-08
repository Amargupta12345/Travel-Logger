const jwt = require("jsonwebtoken");

const secret = "JWT_SECRET";

exports.getToken = function (payload, cb) {
  jwt.sign(payload, secret, { expiresIn: "24h" }, function (err, token) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, token);
    }
  });
};

exports.verifyToken = function (token, cb) {
  jwt.verify(token, secret, function (err, payload) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, payload);
    }
  });
};

exports.isloggedIn = function (req, res, next) {
  var token = req.get("Auth");

  jwt.verify(token, secret, function (err, payload) {
    console.log(payload);
    if (err) {
      console.log(err);
      res.status(401).send({
        error: "You must be login first",
      });
    } else {
      next();
    }
  });
};
