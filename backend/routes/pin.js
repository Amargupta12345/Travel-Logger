const express = require("express");
const router = express.Router();
const Pin = require("../models/pin");
const multer = require("multer");
const service = require("../controllers");

// router.post("/", async (req, res, next) => {
//   const savedPin = new Pin(req.body);
//   try {
//     const newPin = await savedPin.save();
//     res.status(200).json(newPin);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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
