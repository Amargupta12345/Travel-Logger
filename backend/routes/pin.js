const express = require("express");
const router = express.Router();
const multer = require("multer");
const service = require("../controllers/Pin-Controller");
const token = require("../helper/token");

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

router.post("/upload", token.isloggedIn, upload.single("file"), service.upload);

//get all pins
router.get("/", token.isloggedIn, service.Details);

router.patch("/update/:id", token.isloggedIn, service.Update);

router.delete("/delete/:id", service.Delete);

module.exports = router;
