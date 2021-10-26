const express = require("express");
const router = express.Router();
const multer = require("multer");
const service = require("../controllers/Pin-Controller");

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
router.get("/", service.Details);

router.patch("/update/:id", service.Update);

router.delete("/delete/:id", service.Delete);

module.exports = router;
