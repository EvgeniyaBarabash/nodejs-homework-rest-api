const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
const { joiSignupSchema, joiLoginSchema, verifyEmailSchema } = require("../../models");
const ctrl = require("../../controllers/auth");

router.post("/signup", validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.current));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));
router.post("/verify", validation(verifyEmailSchema), ctrlWrapper(ctrl.repeatVerify));

module.exports = router;  