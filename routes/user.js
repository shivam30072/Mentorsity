const router = require("express")();
const { signUpUser, loginUser } = require("../controllers/user");
// const authMiddleware = require("../middleware/authMiddlware");\

router.route("/signup").post(signUpUser);
router.post("/login", loginUser);

module.exports = router;
