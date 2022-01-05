const express = require("express");
const router = express.Router();
const ValidateAdmin = require("../middleware/validateAdmin");
const fetchFromAdmin = require("../controllers/fetchFromAdmin");
const upload = require("../../util/multer");
const uploadVideos = require("../../util/multerForVideo");
const fetchuser = require("../middleware/fetchuser");
const ReferAmount = require("../../models/ReferModal");
const User_Login_Schema = require("../../models/User_Login");

// ROUTE 1: Fetch all user

// router.get("/allUsers/:search", fetchFromAdmin.fetchUserData);
router.post("/allUserss", ValidateAdmin, fetchFromAdmin.fetchUserDatas);
router.post("/userDetail/:_id", ValidateAdmin, fetchFromAdmin.userDetail);

// ======================Validate admin======================
router.post("/validator", ValidateAdmin, async (req, res) => {
  try {
    console.log("token validate");
    // let Aconditions = { status: "active" };
    // let InAconditions = { status: "InActive" };
    let paginate = {
      select: ["-password", "-otp"],
    };
    const AUsers = await User_Login_Schema.find();
    // const InUsers = await User_Login_Schema.paginate(InAconditions, paginate);
    console.log("AUsers>>>>", AUsers.length);
    // console.log(InUsers.data.length);
    return res.status(200).json({
      message: "token validate",
      AUsers,
    });
  } catch (error) {
    return res.status(500).json({ error});
  }
});

// ======================Banner======================

router.post(
  "/banner",
  ValidateAdmin,
  upload.array("img"),
  fetchFromAdmin.bannerCreate
);

router.get("/banners", ValidateAdmin, fetchFromAdmin.findBannerImage);
router.get("/userBanners", fetchuser, fetchFromAdmin.findBannerImage);

router.delete("/banner/delete/:id", ValidateAdmin, fetchFromAdmin.ImageDelete);

// ======================Admin Pannel Videos======================

router.get("/AdminVideo", ValidateAdmin, fetchFromAdmin.findAdminVideo);
router.get("/UserVideo",fetchuser, fetchFromAdmin.findAdminVideo);
router.post(
  "/AdminVideo",
  ValidateAdmin,
  uploadVideos.array("video"),
  fetchFromAdmin.videoCreate
);

router.delete("/AdminVideo/:id", ValidateAdmin, fetchFromAdmin.VideoDelete);

// ======================Packages======================
// create package
router.post("/createpackage", ValidateAdmin, fetchFromAdmin.createPackage);
// get all packages

router.get("/getpackages", fetchuser, fetchFromAdmin.getPackage);

// get all packages by admin
router.get("/getpackagesbyadmin", ValidateAdmin, fetchFromAdmin.getPackage);

router.get("/fetchReferAmount", ValidateAdmin, async (req, res) => {
  try {
    // let result = await ReferAmount.create({ refer: 5 });
    const refervalue = await ReferAmount.find();
    let data = {};

    refervalue.map((x, n) => {
      if (n === 0) {
        data = {
          referamt: x.refer,
          _id: x._id,
        };
      }
    });
    console.log(typeof data.referamt, "here");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});
router.put("/editReferAmount/:id", ValidateAdmin, async (req, res) => {
  try {
    // let result = await ReferAmount.create({ refer: 5 });
    const refer = req.body;
    let _id = req.params.id;
    // console.log(req.body);
    const refervalue = await ReferAmount.findOneAndUpdate({ _id }, refer, {
      new: true,
    });
    // console.log(refervalue);
    if (refervalue) res.status(200).json(refervalue);
    if (!refervalue)
      res.status(500).json({ error: "intenal error in edit ref" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/creater", async (req, res) => {
  try {
    const { refer } = req.body;
    const response = await ReferAmount.create({ refer });
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({error})
  }
});

// delete all packages
router.delete(
  "/package/delete/:id",
  ValidateAdmin,
  fetchFromAdmin.packageDelete
);

// packages update
router.put("/package/update/:id", ValidateAdmin, fetchFromAdmin.packageUpdate);

// ==================User==================

router.put("/user/update/:id", ValidateAdmin, fetchFromAdmin.userUpdate);

// ==================Notification==================

router.post("/notification/:id", ValidateAdmin, fetchFromAdmin.notification);
router.post(
  "/notificationtoall",
  ValidateAdmin,
  fetchFromAdmin.pushNotificationToAll
);

// ==================User Forget Apis==================
// user forget password
router.put("/user/forget", fetchFromAdmin.userForgetPass);
router.put("/user/checkOtp", fetchFromAdmin.checkotp);
router.put("/user/createNewPassword", fetchFromAdmin.createNewPassword);

module.exports = router;
