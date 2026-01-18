const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  // Handle Bearer token
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;

