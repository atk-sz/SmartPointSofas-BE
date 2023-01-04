const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      index: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "seller",
      enum: ["seller", "admin"],
    },
  },
  { timestamps: true }
);

// Limit what fields you want to send back to the user
userSchema.statics.toClientObject = function (user) {
  const userObject = user?.toObject();

  const clientObject = {
    _id: userObject._id,
    name: userObject.name,
    role: userObject.role,
    phone: userObject.phone,
    createdAt: userObject.createdAt,
    updatedAt: userObject.updatedAt,
  };

  return clientObject;
};

module.exports = mongoose.model("User", userSchema);
