const { Contact } = require("../../models/contact");

const listContact = async (req, res) => {
    const contacts = await Contact.find({});
    res.json({
        status: "success",
        code: 200,
        data: {
            result: contacts,
        },
    });
};
module.exports = listContact;
