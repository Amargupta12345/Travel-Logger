const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//email validator
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//password validator
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

UserSchema.path("email").validate(
  (email) => emailRegex.test(email),
  "Invalid email id format"
);

UserSchema.path("password").validate(
  (password) => passwordRegex.test(password),
  "Invalid password format - Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 numeric character, and one special character"
);

module.exports = mongoose.model("User", UserSchema);
