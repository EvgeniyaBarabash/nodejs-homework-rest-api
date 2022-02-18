const { User } = require("../../models");
const Conflict = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require('gravatar');
const { v4 } = require("uuid");
const { sendMail } = require("../../helpers");

const signup = async (req, res) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(409, "Email in use");
    }
    const verificationToken = v4();
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const avatarURL = gravatar.url(email);
    const result = await User.create({ email, avatarURL, password: hashPassword, verificationToken, subscription });
    const mail = {
        to: email,
        subject: "Подтвеждение email",
        html: `<a target="_blank" href='http://localhost:3000/api/users/verify/${verificationToken}'>Нажмите чтобы подтвердить свой email</a>`
    }
    await sendMail(mail, verificationToken);
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                email: result.email,
                subscription: result.subscription,
                avatarURL: result.avatarURL,
            }
        }
    })
};
module.exports = signup;