const router = require("express").Router();

const authController = require("../../controllers/auth.controller");
const { registerValidator, loginValidator } = require("../../validators/auth.validator");
const runValidator = require("../../middlewares/validator.middleware");

router.post("/signup", registerValidator, runValidator, authController.register);
router.post("/signin", loginValidator, runValidator, authController.login)

module.exports = router;