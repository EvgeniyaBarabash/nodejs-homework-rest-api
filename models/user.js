const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: "",
    },
    avatarURL: {
        avatarURL: String,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },

}, { versionKey: false, timestamps: true });

const User = model("user", userSchema);

const joiSignupSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
    avatarURL: Joi.string(),
});
const joiLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
})
const verifyEmailSchema = Joi.object({
    email: Joi.string()
})

module.exports = {
    User,
    joiSignupSchema,
    joiLoginSchema,
    verifyEmailSchema,
}