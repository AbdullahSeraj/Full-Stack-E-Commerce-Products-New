const jwt = require("jsonwebtoken");

const verifyJWTtoAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization; // "Bearer token"

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1]; // ["Bearer","token"]
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    if (!decoded.UserInfo.role)
      return res.status(403).json({ message: "You are not admin" });

    req.user = decoded.UserInfo.id;
    next();
  });
};
module.exports = verifyJWTtoAdmin;
