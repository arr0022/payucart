var jwt = require("jsonwebtoken");
const Admin_Login_Schema = require("../../models/Admin_Login");

const ValidateAdmin = async (req, res, next) => {
  // console.log(req.header('auth-token'), "header");
  const token = req.header("auth-token");
  try {
    if (!token) {
      return res
        .status(401)
        .json({ error: "Please authenticate using a valid token" });
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const Admin = await Admin_Login_Schema.findById({
      _id: data.user.id,
    }).select("-password");
    if (!Admin) {
      return res.status(400).json({ error: "Invalid Credential" });
    }
    return next();
  } catch (error) {
    return res.status(401).json({
      error: error.message || "Please authenticate using a valid token",
    });
  }
};

module.exports = ValidateAdmin;
