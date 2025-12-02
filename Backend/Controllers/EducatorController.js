const Educator = require("../Models/Educator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER EDUCATOR
exports.registerEducator = async (req, res) => {
  try {
    const { name, email, password, expertise, bio } = req.body;

    const exists = await Educator.findOne({ email });
    if (exists)
      return res.status(400).json({ success: false, message: "Educator exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const educator = await Educator.create({
      name,
      email,
      password: hashedPassword,
      expertise,
      bio
    });

    const token = jwt.sign({ id: educator._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ success: true, educator, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN EDUCATOR
exports.loginEducator = async (req, res) => {
  try {
    const { email, password } = req.body;

    const educator = await Educator.findOne({ email });
    if (!educator)
      return res.status(404).json({ success: false, message: "Educator not found" });

    const match = await bcrypt.compare(password, educator.password);
    if (!match)
      return res.status(400).json({ success: false, message: "Incorrect password" });

    const token = jwt.sign({ id: educator._id }, process.env.JWT_SECRET);

    res.json({ success: true, educator, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};