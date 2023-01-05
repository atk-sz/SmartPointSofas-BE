const Sofa = require("../models/sofa");

exports.getAllSofas = async (req, res) => {
  const allSofas = await Sofa.find().populate("uploader");
  res.json(allSofas);
};
exports.createSofa = async (req, res) => {
  try {
    let sofa = req.body;
    sofa.uploader = "63b68d00d4db6a2866b631ee";
    var newSofa = await new Sofa(sofa).save();
    res.json(newSofa);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.getSofa = async (req, res) => {
  const { id } = req.params;
  const foundSofa = await Sofa.findById(id).populate("uploader");
  if (!foundSofa)
    return res.status(404).send("This sofa does not exists anymore");
  res.json(foundSofa);
};

exports.deleteSofa = async (req, res) => {
  const { id } = req.params;
  const foundSofa = await Sofa.findByIdAndDelete(id).populate("uploader");
  if (!foundSofa) return res.status(404).send("This sofa does not exists");
  res.json(foundSofa);
};
