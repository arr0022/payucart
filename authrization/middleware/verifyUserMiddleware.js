const { body, validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs");
const User_Login_Schema = require("../../models/User_Login");
const Admin_Login_Schema = require("../../models/Admin_Login");

exports.hasUserValidCredentialFields = [
  body("name", "name must have 3 character").isLength({ min: 1 }),
  body("mobile", "Enter a valid mobile").isLength({ min: 10, max: 10 }),
  body("password", "Password must be atleast 8 characters").isLength({
    min: 8,
  }),
];

exports.hasAdminValidCredentialFields = [
  body("email", "Enter a valid mobile").isEmail(),
  body("password", "Password must be atleast 7 characters").isLength({
    min: 7,
  }),
];

exports.hasValidPlanFeilds = [
  check("plan")
    .notEmpty()
    .withMessage("All field is required"),
  check("commission")
    .notEmpty()
    .withMessage("All field is required"),
  check("dailyAds")
    .notEmpty()
    .withMessage("All field is required"),
  check("expireIn")
    .notEmpty()
    .withMessage("All field is required"),
  check("totalROI")
    .notEmpty()
    .withMessage("All field is required")
];

exports.createSecretPassword = async (req, res, next) => {
  try {
    console.log("createSecretPassword");
    // console.log(req);
    const errors = validationResult(req);
    let referCode = "refer".concat(
      Math.floor(Math.random() * 123456789 * 369).toString()
    );
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Please Enter Valid detail" });
    }
    //   let user = {}
    if (req.body.mobile) {
      console.log(req.body);
      let user = await User_Login_Schema.findOne({ mobile: req.body.mobile });
      console.log(user);
      if (user)
        return res
          .status(405)
          .json({ error: "Sorry a user with this Mobile is already exists" });
      let checkRef = await User_Login_Schema.findOne({ referCode });
      if (checkRef) {
        referCode = "refer".concat(
          Math.floor(Math.random() * 369456789 * 369).toString()
        );
      }
    } else if (req.body.email) {
      let user = await Admin_Login_Schema.findOne({ email: req.body.email });
      if (user)
        return res
          .status(400)
          .json({ error: "Sorry a Admin with this Email is already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const secretPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = secretPassword;
    req.body.referCode = referCode;
    return next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// export.verifySecretPassword = async(req,res,next) => {

// }
