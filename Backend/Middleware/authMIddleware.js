const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Unauthorized - No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains id + role
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.isEducator = (req, res, next) => {
  console.log(req.user.role)
  if (req.user.role !== "educator") {
    return res.status(403).json({
      success: false,
      message: "Educator access only"
    });
  }
  next();
};
