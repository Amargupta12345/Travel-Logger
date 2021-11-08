const router = require("express").Router();
const UserService = require("../controllers/User-Controller");

//REGISTER
router.get("/", (req, res) => {
  res.send("now you can access api");
});
router.post("/register", UserService.Register);

router.get("/verify", UserService.Verify);

//LOGIN
router.post("/login", UserService.Login);

module.exports = router;
