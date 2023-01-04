const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const sofaSchema = new mongoose.Schema(
  {
    name: { type: String },
    capacity: { type: Number, required: true },
    color: { type: String, required: true },
    shape: { type: String, required: true },
    in_stock: {
      type: Boolean,
      required: true,
      default: true,
    },
    description: { type: String, required: true },
    dimension: {
      h: { type: Number, required: true },
      w: { type: Number, required: true },
      l: { type: Number, required: true },
    },
    seat_material: { type: String, required: true },
    leg_material: { type: String, required: true },
    finish: { type: String, required: true },
    uploader: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sofa", sofaSchema);
