const { User } = require("../../models");
const Conflict = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require('gravatar');
const signup = async (req, res) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(409, "Email in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const avatarURL = gravatar.url(email);
    const result = await User.create({ email, avatarURL, password: hashPassword, subscription });

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