const express = require("express");
const router = express.Router();

// middlewares
const { validateSofa } = require("../middlewares/joi");

// route controllers
const { getAllSofas, createSofa, getSofa } = require("../controllers/sofa");

router.get("/sofas", getAllSofas);
router.post("/sofa/new", validateSofa, createSofa);
router.post("/sofa/:id", getSofa);

module.exports = router;
