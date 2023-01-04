const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const appointmentSchema = new mongoose.Schema(
  {
    name: String,
    phone: {
      type: String,
      required: true,
    },
    DOA: {
      type: String,
      required: true,
    },
    sofa: {
      type: ObjectId,
      ref: "Sofa",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
