const express = require("express");
const router = express.Router();
const Pin = require("../models/pin");
const multer = require("multer");
const service = require("../controllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    console.log(">>>>>>>>>>>>>>>>>>", file);
    exports.file = file.originalname;

    // console.log("User Data file", file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), service.upload);

// router.post("/", async (req, res, next) => {
//   const savedPin = new Pin(req.body);
//   try {
//     const newPin = await savedPin.save();
//     res.status(200).json(newPin);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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
//     console.log(req.file);
//     //new user request body using mongo model from schema
//     const newPin = new Pin({
//       username: req.body.username,
//       title: req.body.title,
//       desc: req.body.desc,
//       rating: req.body.rating,
//       long: req.body.long,
//       lat: req.body.lat,
//       description: req.body.description,
//       image: req.file.path,
//     });

//     try {
//       const SavePin = await newPin.save();
//       res.status(200).json(SavePin);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
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
