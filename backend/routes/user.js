const router = require("express").Router();
const UserService = require("../controllers/User-Controller");

//REGISTER
router.post("/register", UserService.Register);

router.get("/verify", UserService.Verify);

//LOGIN
router.post("/login", UserService.Login);

module.exports = router;
