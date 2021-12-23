var jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  try {
    console.log("fetchuser");
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).json({ error: "Please authenticate using a valid token" });
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(data.user);
    req.user = data.user;
    return next();
  } catch (error) {
    return res.status(401).json({error: error.message || "Please authenticate using a valid token",});
  }
};

module.exports = fetchuser;
