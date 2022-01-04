const User_Login_Schema = require("../../models/User_Login");
const Admin_Login_Schema = require("../../models/Admin_Login");
const Package = require("../../models/Packages");
var jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcryptjs");
const axios = require("axios").default;
const { verifyAccessToken } = require("../jwt_helper/jwt.Helper");
const { unlink } = require("fs");
const convertImage = require("../../util/base64toString");
const User_Transaction_Schema = require("../../models/Transaction");
const User_Beneficiary = require("../../models/User_Beneficiary");
const ReferAmount = require("../../models/ReferModal");
const imgs_path = path.join(__dirname + "../../../upload/profile");

exports.create = async (req, res) => {
  try {
    console.log("userCreate");
    let user = {};
    if (req.body.mobile) {
      // Create a new user
      console.log("user");
      user = await User_Login_Schema.create({
        name: req.body.name,
        mobile: req.body.mobile,
        password: req.body.password,
        referCode: req.body.referCode,
      });
    } else if (req.body.email) {
      user = await Admin_Login_Schema.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    const expiry = { expiresIn: "100ms" };
    const authtoken = verifyAccessToken(data, expiry);

    let success = true;
    return res.status(200).json({ success, authtoken });
  } catch (error) {
    let success = false;
    // console.error(error.message);
    return res.status(500).json({error})
  }
};

exports.getBeneficiaryByNo = async (req, res) => {
  try {
    console.log("getBeneficiaryByNo");
    let Users = "";
    if (req.body.mobile)
      Users = await User_Login_Schema.findOne({
        mobile: req.body.mobile,
      }).select("-password");
    else {
      return res.status(400).json({
        error: "Missing detail",
      });
    }
    let beneficiary = "";
    if (Users !== null) {
      beneficiary = await User_Beneficiary.findOne({
        beneId: Users._id.toString(),
      }).select("-_id");
    } else {
      return res.status(400).json({
        error: "Invalid Credential",
      });
    }
    if (beneficiary === null)
      return res.status(404).json({
        success: false,
      });
    // console.log(user);
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({error})
  }
};

exports.login = async (req, res) => {
  try {
    console.log("userlogin", req.body);
    let user = {};
    let expiry = {};

    const { password } = req.body;

    if (req.body.mobile) {
      let { mobile } = req.body;
      const fcm_token = req.header("fcm_token");
      if (!fcm_token) {
        // console.log(fcm_token);
        return res.status(400).json({ error: "fcm_token didn't Receive" });
      }
      user = await User_Login_Schema.findOne({ mobile });
      if (!user) {
        console.log("notfound");
        return res
          .status(400)
          .json({ error: "Please try to login with correct mobile" });
      } else if (user) {
        let fcm_upadate = await User_Login_Schema.findOneAndUpdate(
          { mobile },
          { fcm_token },
          { new: true }
        ).select("-password");
        console.log("fcm_upadate successfully");
        expiry = { expiresIn: "4y" };
      }
    } else if (req.body.email) {
      let { email } = req.body;
      user = await Admin_Login_Schema.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          error: "Please try to login with correct email",
        });
      }
      expiry = { expiresIn: "720h" };
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({
        success: false,
        error: "Please try to login with correct credential",
      });
    }
    console.log(passwordCompare);

    const data = {
      user: {
        id: user.id,
        date: Date.now,
      },
    };
    const authtoken = await verifyAccessToken(data, expiry);

    let success = true;
    console.log({ success, authtoken });
    return res.status(200).json({ success, authtoken });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({error})
  }
};

exports.getBeneficiary = async (req, res) => {
  try {
    console.log("getuser");
    userId = req.user.id;
    const beneficiary = await User_Beneficiary.findOne({
      beneId: userId.toString(),
    }).select("-_id");
    if (!beneficiary)
      return res.status(500).json({
        success: false,
        error: "user beneficiary account doesn't exist",
      });
    // console.log(user);
    return res.status(200).json(beneficiary);
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({error})
  }
};

exports.getuser = async (req, res) => {
  try {
    console.log("getuser");
    let userId = req.user.id;
    const user = await User_Login_Schema.findById(userId).select("-password");
    if (!user)
      return res
        .status(401)
        .json({ success: false, error: "user doesn't exist" });
    let wallet = user.wallet.toString();
    let r = wallet.indexOf(".");
    if (r !== -1) {
      wallet = wallet.replace(wallet.slice(wallet.indexOf(".") + 2), "");
    }
    user.wallet = wallet;
    console.log("updateuser", user);
    return res.status(200).json(user);
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({error})
  }
};

exports.getwallet = async (req, res) => {
  try {
    console.log("getwallet");
    userId = req.user.id;
    const userTransaction = await User_Transaction_Schema.find({
      users: userId.toString(),
    }).select("-_id");
    if (!userTransaction)
      return res
        .status(401)
        .json({ userTransaction: "user doesn't have any transaction" });
    // console.log(userTransaction);
    return res.status(200).json(userTransaction);
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({error})
  }
};

exports.getuserfornext = async (req, res, next) => {
  try {
    console.log("getuserfornext");
    userId = req.user.id;
    const user = await User_Login_Schema.findById(userId).select("-password");
    if (!user)
      return res
        .status(401)
        .json({ success: false, error: "user doesn't exist" });
    else if (user) {
      req.user = await user;
      // console.log(req.user);
      return next();
    }
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({error})
  }
};

exports.getAdmin = async (req, res) => {
  try {
    userId = req.user.id;
    const user = await Admin_Login_Schema.findById(userId).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({error})
  }
};

exports.refer = async (req, res) => {
  try {
    const { referBy } = req.body;
    if (!referBy)
      return res.status(401).json({ message: "referBy is missing" });
    const userId = req.user.id;
    const user = await User_Login_Schema.findById(userId).select("-password");
    if (!user) return res.status(401).json({ message: "user doesn't exist" });
    console.log(user);
    if (user.referBy !== "None")
      return res
        .status(400)
        .json({ message: "Already get a reward for reward" });
    if (user.referCode === referBy) {
      console.log(`user.referCode === referBy`);
      return res
        .status(400)
        .json({ message: "You can't use your own refer code" });
    }
    if (user.referBy === "None" && user.referCode !== referBy) {
      // console.log(`user.referBy === "None" && user.referCode !== referBy`)
      const refervalue = await ReferAmount.find().select("refer");
      let referinr = 1;
      refervalue.map((x, n) => {
        if (n === 0) referinr = x.refer;
      });
      let wallet = parseFloat(referinr) + parseFloat(user.wallet) + 0.1;
      console.log("Before String wallet.>>>>", wallet);
      wallet = wallet.toString();
      let r = wallet.indexOf(".")
      if(r!==-1){
        wallet = wallet.replace(wallet.slice(wallet.indexOf(".") + 2), "");
      }
      // console.log("wallet.>>>>",wallet);
      let findRefer = await User_Login_Schema.findOne({ referCode: referBy });

      if (!findRefer)
        return res.status(400).json({ message: "Refer Code Not Exist" });

      let result = await User_Login_Schema.findByIdAndUpdate(
        { _id: userId },
        { referBy, wallet },
        { new: true }
      );
      if (!result)
        return res.status(400).json({ error: "Internal Server Error" });

      let amount = referinr;
      let remark = `reward for refer a user`;
      let addTransaction = await User_Transaction_Schema.create({
        users: userId.toString(),
        remark,
        amount,
      });
      console.log("Before Convert wallet.>>>>", findRefer.wallet);
      wallet = parseFloat(findRefer.wallet) + parseFloat(referinr) + 0.1;
      console.log("Before String wallet.>>>>", wallet);
      wallet = wallet.toString();
      console.log("After String wallet.>>>>", wallet);
      let r1 = wallet.indexOf(".")
      if(r1!==-1){
        wallet = await wallet.replace(wallet.slice(wallet.indexOf(".") + 2), "");
      }
      console.log("wallet.>>>>", wallet);
      let refercode = await User_Login_Schema.findOneAndUpdate(
        { referCode: referBy },
        { wallet },
        { new: true }
      );
      // if (!refercode)
      //   return res.status(400).json({ error: "Internal Server Error" });
      if (refercode) {
        console.log(refercode);
        addTransaction = await User_Transaction_Schema.create({
          users: refercode._id.toString(),
          remark,
          amount,
        });
      }
      return res
        .status(200)
        .json({ success: true, message: "get a reward for refer" });
    }
    return res
      .status(400)
      .json({ success: true, message: "Internal Server Error" });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({error})
  }
};

// exports.pushNotificationforpurpose = async (req, res) => {
//   try {
//     let payload = req.body;
//     let _id = req.body._id;
//     console.log(payload, "payload");
//     const user = await User_Login_Schema.findById(_id).select("-password");
//     console.log(user, "user");
//     var notification = {
//       title: payload.title,
//       text: payload.text,
//     };
//     var fcm_token = [];
//     fcm_token.push(payload.token);
//     // for(var i=0; i<user.length;i++){
//     //     fcm_token.push(user[i].fcm_token)
//     // }
//     var notification_key = {
//       notification: notification,
//       registration_ids: fcm_token,
//     };
//     console.log(notification_key, "send");
//     await axios
//       .post("https://httpbin.org/post", notification_key, {
//         headers: {
//           // 'application/json' is the modern content-type for JSON, but some
//           // older servers may use 'text/json'.
//           // See: http://bit.ly/text-json
//           Authorization: `key=${process.env.firebase_msg_key}`,
//           "content-type": "text/json",
//         },
//       })
//       .then((res) => {
//         console.log("send :");
//       })
//       .catch((err) => {
//         console.log("err");
//       });
//   } catch (error) {
//    console.log("err");
//   }
// };

exports.editProfile = async (req, res) => {
  try {
    console.log("editProfile");
    // let data = req.files;
    let data = req.body.img;
    if (!data) return res.status(400).json({ error: "image not found" });
    let fileName = "img";
    let pathName = await convertImage(data, fileName);
    if (!pathName) return res.status(400).json({ error: "Internal error" });
    // if (!img || img.length == 0) return res.status(400).json({error: "image not found"});
    // console.log(img.length);
    const userId = req.user.id;
    let option = {
      profile: process.env.base + "/" + pathName,
    };

    // let track = await User_Login_Schema.findOne({ _id: userId }).select("-password");
    // if (track.profile !== "None") {
    //   let file = track.profile.slice(track.profile.lastIndexOf("/"));
    //   console.log("None", file);
    //   console.log(`${imgs_path}${file}`);
    //   unlink(`${imgs_path}${file}`, (err) => {
    //     if (err) console.log(err);
    //     console.log("successfully deleted");
    //   });
    // }
    let user = await User_Login_Schema.findOneAndUpdate(
      { _id: userId },
      option,
      { new: true }
    ).select("-password");
    if (!user) return res.status(400).json({ error: "Internal Server Error" });
    console.log(user);
    return res.status(200).json({ message: "Profile added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({error})
  }
};

// FOR GETTING REWARD
exports.reward = async (req, res) => {
  try {
    console.log("reward");
    let userId = await req.user.id;
    // console.log(req.user," and ")
    const user = await User_Login_Schema.findById({ _id: userId }).select(
      "-password"
    );
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User Not Exist" });
    if (user.plan > 0 && user.perDayAddLimit > 0) {
      let packages = await Package.findOne({ plan: user.plan });
      console.log("CurrentBal=>", user.wallet);
      if (!packages.dailyAds)
        return res
          .status(500)
          .json({ success: "false", message: "Interval Server Error" });
      let perDayAddLimit = user.perDayAddLimit - 1;
      let calCommission = user.commission / packages.dailyAds;
      console.log("calCommission", calCommission);
      let wallet = parseFloat(user.wallet) + parseFloat(calCommission);
      console.log("wallettt", wallet);
      wallet = wallet.toString();
      let r = wallet.indexOf(".");
      if (r !== -1) {
        wallet = wallet.replace(wallet.slice(wallet.indexOf(".") + 2), "");
      }

      let tEarning =
        parseFloat(user.tEarning) + parseFloat(calCommission);
      console.log("tEarning before string", tEarning);
      tEarning = tEarning.toString();
      let tr = tEarning.indexOf(".");
      if (tr !== -1) {
        tEarning = tEarning.replace(tEarning.slice(tEarning.indexOf(".") + 2),"");
      }
      console.log("tEarning after string", tEarning);
      let tcomplete = user.tcomplete + 1;
      let changes = {
        perDayAddLimit,
        wallet: wallet.toString(),
        tEarning: tEarning.toString(),
        tcomplete,
      };
      console.log({
        perDayAddLimit,
        wallet,
        tEarning,
        tcomplete,
        commission: user.commission,
        commission1: calCommission,
      });
      const check = await User_Login_Schema.findByIdAndUpdate(
        { _id: user._id },
        changes,
        { new: true }
      ).select("-password");
      if (!check)
        return res
          .status(500)
          .json({ success: "false", message: "Interwal Server Errors" });
      let amount = calCommission;
      let remark = `reward add to wallet`;
      let addTransaction = await User_Transaction_Schema.create({
        users: check._id.toString(),
        remark,
        amount,
      });
      console.log(addTransaction);
      if (!addTransaction)
        return res
          .status(500)
          .json({ success: "false", message: "Interwal Server Err" });
      return res.status(200).json({
        success: true,
        message: "reward add in wallet successfully",
        check,
      });
    }
    // let check = await User_Login_Schema.findById({_id: user._id}).select("-password");
    if (user.plan > 0)
      return res.status(200).json({
        success: "false",
        message: "You Reach your daily limit",
        user,
      });
    return res
      .status(400)
      .json({ success: "false", message: "You Don't Have Active Plan" });
  } catch (error) {
    return res.status(500).json({error})
  }
};

exports.getUserPlan = async (req, res) => {
  try {
    console.log("getuser");
    userId = req.user.id;
    const user = await User_Login_Schema.findById(userId).select("-password");
    if (!user)
      return res
        .status(401)
        .json({ success: false, error: "user doesn't exist" });
    let packages = await Package.findOne({ plan: user.plan });
    console.log(packages);
    if (!packages)
      return res
        .status(401)
        .json({ success: false, error: "plan doesn't exist" });
    return res.status(200).json({ success: true, package: packages });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({error})
  }
};
