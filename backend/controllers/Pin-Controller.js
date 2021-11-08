const cloudinary = require("cloudinary").v2;
const ind = require("../routes/pin");
const Pin = require("../models/pin");

exports.upload = function (req, res) {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });

  cloudinary.uploader.upload(
    `./uploads/${ind.file}`,
    async function (error, result) {
      let body = {
        ...req.body,
        image: result.url,
      };

      const savedPin = new Pin(body);

      try {
        const newPin = await savedPin.save();

        res.status(200).json(newPin);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );
};

exports.Details = async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.Update = async (req, res, next) => {
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
};

exports.Delete = async (req, res, next) => {
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
};
