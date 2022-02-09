const { Contact, joiSchema, favoriteJoiSchema } = require("./contact");
const { User, joiSignupSchema, joiLoginSchema } = require("./user");

module.exports = {
    Contact,
    joiSchema,
    favoriteJoiSchema,
    User,
    joiSignupSchema,
    joiLoginSchema,
}
