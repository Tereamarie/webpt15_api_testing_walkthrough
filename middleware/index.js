const db = require("../data/dbConfig");

const validateAnimalId = async (req, res, next) => {
  try {
    const validId = await db("animals").where("id", req.params.id).first();

    if (!validId)
      return res.status(404).json({ message: "Animal does not exist" });

    req.validAnimalID = validId;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { validateAnimalId };
