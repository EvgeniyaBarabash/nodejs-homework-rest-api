const { Contact } = require("../../models/contact");

const add = async (req, res) => {
    const { _id } = req.user;
    const data = { ...req.body, owner: _id };
    const result = await Contact.create(data);
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            result,
        },
    });
};
module.exports = add;
