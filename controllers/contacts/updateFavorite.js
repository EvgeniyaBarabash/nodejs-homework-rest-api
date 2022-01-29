const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");
const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;
    if (!req.body) {
        throw new NotFound(400, "Missing field favorite!");
    }
    const result = await Contact.findByIdAndUpdate(
        id,
        { favorite },
        { new: true }
    );
    if (!result) {
        throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result,
        },
    });
};
module.exports = updateFavorite;
