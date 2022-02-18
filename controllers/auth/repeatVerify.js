const { NotFound, BadRequest } = require("http-errors");
const { User } = require("../../models");
const sendMail = require("../../helpers");

const repeatVerify = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new BadRequest("missing required field email");
    }
    const user = await User.findOne({ email });
    if (!user) throw new NotFound('User not found');
    if (user.verify) {
        throw new BadRequest(400, "Verification has already been passed");
    };
    const mail = {
        to: email,
        subject: "Подтвеждение email",
        html: `<a target="_blank" href='http://localhost:3000/api/users/${user.verificationToken}'>Нажмите чтобы подтвердить свой email</a>`
    }
    await sendMail(mail, user.verificationToken);
    res.json({
        "message": "Verification email sent"
    })
};

module.exports = repeatVerify;