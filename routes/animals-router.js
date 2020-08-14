const express = require("express");
const Animals = require("../models/animals-model");
const router = express.Router();
const { validateAnimalId } = require("../middleware/index");

// /animals/<endpoint>
router.get("/", async (req, res, next) => {
  try {
    return res.json(await Animals.getAllAnimals());
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newAnimal = await Animals.add(req.body);
    res.status(201).json(newAnimal);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateAnimalId, (req, res) => {
  res.json(req.validAnimalID);
});

router.delete("/:id", validateAnimalId, async (req, res, next) => {
  try {
    await Animals.remove(req.params.id);
    res.json({ message: "DELETED", animial: { ...req.validAnimalID } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
