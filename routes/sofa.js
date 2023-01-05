const express = require("express");
const router = express.Router();

// middlewares
const { validateSofa } = require("../middlewares/joi");
const { authcheck } = require("../middlewares/auth");

// route controllers
const {
  getAllSofas,
  createSofa,
  getSofa,
  deleteSofa,
} = require("../controllers/sofa");

router.get("/sofas", getAllSofas);
router.post("/sofa/new", validateSofa, createSofa);
router.get("/sofa/:id", getSofa);
router.delete("/sofa/:id", authcheck, deleteSofa);

module.exports = router;
