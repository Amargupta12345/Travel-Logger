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
