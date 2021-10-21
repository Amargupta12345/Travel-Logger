const cloudinary = require("cloudinary").v2;
const ind = require("../routes/pin");
const Pin = require("../models/pin");

exports.upload = function (req, res) {
  console.log("hello world");
  cloudinary.config({
    cloud_name: "viruscoder",
    api_key: "422569487794567",
    api_secret: "_G25M0kr2YfDYLCj_zfgJ1Y2C2w",
    secure: true,
  });

  cloudinary.uploader.upload(
    `./uploads/${ind.file}`,
    async function (error, result) {
      console.log("result url", result.url);
      console.log(req.file);

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
