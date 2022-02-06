const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { joiSignupSchema, joiLoginSchema } = require("../../models");
const ctrl = require("../../controllers/auth");

router.post("/signup", validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.current));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));


module.exports = router;  