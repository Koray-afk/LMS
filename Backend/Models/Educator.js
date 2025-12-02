const mongoose = require("mongoose");

const educatorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    expertise: { type: String },
    bio: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Educator", educatorSchema);