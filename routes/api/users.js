const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
const { joiSignupSchema, joiLoginSchema } = require("../../models");
const ctrl = require("../../controllers/auth");

router.post("/signup", validation(joiSignupSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.current));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;  