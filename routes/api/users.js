const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSignupSchema, joiLoginSchema } = require("../../models");
const ctrl = require("../../controllers/auth");

router.post("/signup", validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));




module.exports = router;  