const Sofa = require("../models/sofa");

exports.getAllSofas = async (req, res) => {};
exports.createSofa = async (req, res) => {
  try {
    let sofa = req.body;
    sofa.uploader = "63b68d00d4db6a2866b631ee";
    var newSofa = await new Sofa(sofa).save();
    res.send(newSofa);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.getSofa = async (req, res) => {};
