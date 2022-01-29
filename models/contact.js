const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
    {
        name: {
            type: String,
            minlength: 2,
            maxlength: 50,
            required: [true, "Set name for contact"],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
            required: true,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.number().positive().required(),
    favorite: Joi.bool(),
});

const favoriteJoiSchema = Joi.object({
    favorite: Joi.bool().required(),
});

module.exports = {
    Contact,
    joiSchema,
    favoriteJoiSchema,
};
