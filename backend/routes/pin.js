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
    exports.file = file.originalname;
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

router.patch("/update/:id", async (req, res, next) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const updatedPin = await Pin.findByIdAndUpdate(id, update);
    res.json(updatedPin);
  } catch (error) {
    // check what type of error and send appropriate error message/status code etc.
    error.status = 500;
    next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const removedPin = await Pin.findByIdAndRemove(id);

    if (!removedPin) {
      const error = new Error("Pin not found");
      error.status = 404;
      return next(error);
    }

    res.status(204).send({ message: "deleted succesfully" }); // 204 -> success but nothing sent in response body
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

module.exports = router;
