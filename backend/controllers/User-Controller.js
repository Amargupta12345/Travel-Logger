const User = require("../models/user");
const email = require("../helper/email");
const token = require("../helper/token");
const router = require("express").Router();
const bcrypt = require("bcrypt");

exports.Register = async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond

    // send email for verification
    await token.getToken(
      { email: req.body.email },
      async function (err, token) {
        console.log(token);
        if (err) {
          res.status(500).send({ message: "Error While Token Generation" });
        } else {
          let url = `${req.protocol}://${req.hostname}/user/verify/?token=${token}`;
          if (req.hostname === "localhost") {
            url = `http://localhost:8000/api/users/verify/?token=${token}`;
          }
          console.log(url);

          const newemail = await email.sendVerificationMail(req.body, url);
          await newUser.save();
          console.log(newemail);
          res.status(200).json({ message: "please verfiy the email" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};


exports.Verify = async (req, res, next) => {
  try {
    await token.verifyToken(req.query.token, async function (error, data) {
      if (error) {
        res.status(500).send();
      } else {
        let findQuery = { email: data.email };
        let updateQuery = { $set: { verified: true } };
        await User.findOneAndUpdate(findQuery, updateQuery);
        res.status(200).json({
          message: "user verified succesfylly now you can login ",
        });
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.Login = async (req, res) => {
  try {
    //find user
    let query = { email: req.body.email, verified: true };
    const user = await User.findOne(query);

    if (!user) {
      res.status(400).json("Wrong username or password");
    }

    //validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json("Wrong username or password");
    }

    //send response
    res
      .status(200)
      .json({ _id: user._id, username: user.username, email: user.email });
  } catch (err) {
    res.status(500).json(err.message);
  }
};