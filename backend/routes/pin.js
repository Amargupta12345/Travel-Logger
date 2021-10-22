const express = require("express");
const router = express.Router();
const Pin = require("../models/pin");
const multer = require("multer");

router.post("/", async (req, res, next) => {
  const savedPin = new Pin(req.body);
  try {
    const newPin = await savedPin.save();
    res.status(200).json(newPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// router.post(
//   "/upload",
//   upload.single("file"),

//   async (req, res, next) => {
//     //new user request body using mongo model from schema
//     const newPin = new Pin({
//       username: req.body.username,
//       title: req.body.title,
//       desc: req.body.desc,
//       rating: req.body.rating,
//       long: req.body.long,
//       lat: req.body.lat,
//       description: req.body.description,
//       pictures: req.file.path,
//     });
//     console.log(req.file);

//     try {
//       const SavePin = await newPin.save();
//       res.status(200).json(SavePin);
//     } catch (err) {
//       res.status(500).json(err);
//     }

//     res.json({ postUser });
//     return res.status(201).end();
//   }
// );

//get all pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
