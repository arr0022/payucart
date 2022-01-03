const User_Login_Schema = require("../../models/User_Login");
const Banner = require("../../models/bannerModel");
const Package = require("../../models/Packages");
const sendSms = require("../../util/sendSms");
const bcrypt = require("bcryptjs");
const path = require("path");
const { unlink } = require("fs");
const img = path.join(__dirname + "../../../upload/images/");
const videos = path.join(__dirname + "../../../upload/videos/");
const axios = require("axios").default;
const FCM = require("fcm-node");
const serverKey = process.env.firebase_msg_key;
const User_Transaction_Schema = require("../../models/Transaction");
const adminPannelVideo = require("../../models/AdminVideos");
const { resolveSoa } = require("dns");

// Fetch user Data for admin without pagination create
// exports.fetchUserData = async (req, res) => {
//   try {
//     // console.log(req.params.search)
//     // let a = await /(req.params.search)/i
//     // let b = await "/".concat(a,"/i")
//     // console.log(b, "befor")
//     // b = await JSON.parse(JSON.stringify(b))
//     // let regex = new RegExp("#" + a + "#", "i")
//     let regex = new RegExp(`${req.params.search}`, "ig");
//     // console.log(regex, "after")
//     const Users = await User_Login_Schema.find({ name: regex }).select(
//       "-password"
//     );
//     if (Users.length <= 0) {
//       return res.status(200).json({ success: false, Users: [] });
//     }
//     return res.json({ Users });
//   } catch (error) {
//     let success = false;
//     console.error(error.message);
//     return res
//       .status(500)
//       .json(`${success}: ${error.message} || Internal Server Error`);
//   }
// };

// Fetch user Data for admin with pagination create
exports.fetchUserDatas = async (req, res) => {
  try {
    // let status = req.body.status || Inactive
    const { condition } = req.body;
    console.log(condition);
    if (!condition)
      return res
        .status(500)
        .json({ success: "False", error: "Internal Server Error" });
    let conditions = {};
    if (condition.status !== "") {
      conditions["status"] = condition.status;
    }
    if (condition.plan !== "") {
      conditions["plan"] = condition.plan;
    }
    // let paginate = {
    //   page: PageNo.page,
    //   perPage: PageNo.perPage,
    // };
    console.log(conditions, "conditions>>>>>>>>");
    let Users = "";
    if (conditions.status || conditions.plan) {
      console.log("enterC");
      Users = await User_Login_Schema.find(conditions);
      // console.log(paginate);
    } else {
      // console.log(paginate);
      Users = await User_Login_Schema.find();
    }
    // if (Users.data.length <= 0) {
    //   return res.status(200).json({ success: false, Users: [] });
    // }
    return res.status(200).json(Users);
  } catch (error) {
    let success = false;
    // console.error(error.message);
    return res.status(500).json({error})
  }
};

// banner image create
exports.bannerCreate = async (req, res) => {
  try {
    let img = req.files;
    if (!img || img.length == 0) return res.status(400).json("image not found");
    console.log(img.length);

    for (let i = 0; i < img.length; i++) {
      let option = {
        bannerImage: process.env.base + "/banner/" + img[i].filename,
      };
      user = await Banner.create(option);
    }

    return res.status(200).json({
      message: "banner added Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({error})
  }
};

// VIDEO UPLOAD
exports.videoCreate = async (req, res) => {
  try {
    let video = req.files;
    let user = "";
    if (!video || video.length == 0) return res.json("video not found");
    console.log("video>>>>>>>", video);
    for (let i = 0; i < video.length; i++) {
      let option = {
        AdminVideo: process.env.base + "/videos/" + video[i].filename,
        // ImageThumbnailVideo: process.env.base + "/videos/thumbnail.png/"
      };
      user = await adminPannelVideo.create(option);
    }

    // let option = {
    //   AdminVideo: process.env.base + "/video/" + video[0].filename,
    // };
    console.log(user);
    return res.status(200).json({
      message: "Video  added Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({error})
  }
};

// banner image get---
exports.findAdminVideo = async (req, res) => {
  try {
    console.log("findBannerImage");
    let videos = await adminPannelVideo.find();
    if (videos) {
      // console.log(images);
      return res.status(200).json({ videos });
    }
    return res.status(200).json({ videos: "Not Available" });
  } catch (error) {
    console.log("error>>>>>>>",error);
    return res.status(500).json({error})
  }
};

exports.userDetail = async (req, res) => {
  try {
    // let status = req.body.status || Inactive
    const _id = req.params._id;
    // console.log(_id);
    const Users = await User_Login_Schema.findOne({ _id });
    const Transaction = await User_Transaction_Schema.find({
      users: _id.toString(),
    }).select("-_id");
    // if (Users.data.length <= 0) {
    //   return res.status(200).json({ success: false, Users: [] });
    // }
    // console.lo
    if (Transaction.length <= 0)
      return res
        .status(200)
        .json({ Users, Transaction: "User don't have any transaction yet" });
    else {
      console.log(Transaction.length);
      return res.status(200).json({ Users, Transaction });
    }
  } catch (error) {
    let success = false;
    // console.error(error.message);
    return res.status(500).json({error})
  }
};

// banner image get---
exports.findBannerImage = async (req, res) => {
  try {
    console.log("findBannerImage");
    let images = await Banner.find();
    if (images) {
      // console.log(images);
      return res.status(200).json({ images });
    }
  } catch (error) {
    return res.status(500).json({error})
  }
};

// Videos delete--
exports.VideoDelete = async (req, res) => {
  try {
    let file = req.body.file.slice(req.body.file.lastIndexOf("/"));
    console.log(file);
    unlink(`${videos}${file}`, (err) => {
      if (err) console.log(err);
      console.log("successfully deleted");
    });
    let id = req.params.id;
    let message = await adminPannelVideo.findOneAndRemove({ _id: id });
    // console.log(del);
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// banner image delete--
exports.ImageDelete = async (req, res) => {
  try {
    let file = req.body.file.slice(req.body.file.lastIndexOf("/"));
    console.log(file);
    unlink(`${img}${file}`, (err) => {
      if (err) console.log(err);
      console.log("successfully deleted");
    });
    let id = req.params.id;
    let message = await Banner.findOneAndRemove({ _id: id });
    // console.log(del);
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// create packages---
exports.createPackage = async (req, res) => {
  try {
    let payload = await req.body;
    let commission = await percentage(payload, req, res);
    commission = Math.round(commission);
    let option = {
      plan: payload.plan,
      dailyAds: payload.dailyAds,
      commission,
      expireIn: payload.expireIn,
      totalROI: payload.totalROI,
    };
    let result = await Package.create(option);
    console.log(result);
    return res.status(200).json({ message: "package created" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// get packages--
exports.getPackage = async (req, res) => {
  try {
    console.log("getuserPackage");
    let packagess = await Package.find();
    // console.log(packagess);
    return res.status(200).json({ packagess });
  } catch (error) {
    return res.status(500).json({error})
  }
};

// delete packages--
exports.packageDelete = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await Package.findOneAndRemove({ _id: id });

    return res.status(200).json({
      message: "package deleted",
    });
  } catch (error) {
    return res.status(500).json({error})
  }
};

// package update-=--

exports.packageUpdate = async (req, res) => {
  try {
    let _id = req.params.id;
    let payload = req.body;
    let id = await Package.findOne({ _id });
    if (!id) return res.status(500).json({ message: "Wrong Id" });
    payload.plan = await id.plan;
    let c = await percentage(payload, req, res);
    const commission = Math.round(c);
    let result = await Package.findByIdAndUpdate(
      { _id },
      { commission },
      { new: true }
    );
    if (result) return res.status(201).json({ message: "package updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({error})
  }
};

// update user

exports.userUpdate = async (req, res) => {
  try {
    let _id = req.params.id;
    let payload = req.body;
    let id = await User_Login_Schema.findOne({ _id });
    if (!id) return res.status(500).json({ message: "Wrong Id" });
    payload.plan = await id.plan;
    let c = await percentage(payload, req, res);
    const commission = Math.round(c);
    console.log("commision", "============>", commission);
    let result = await User_Login_Schema.findByIdAndUpdate(
      { _id },
      { commission },
      { new: true }
    );
    if (result) return res.status(201).json({ message: "User updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({error})
  }
};

// Notification user
exports.notification = async (req, res) => {
  try {
    let _id = req.params.id;
    let payload = req.body;
    if (!payload)
      return res.status(400).json({ error: "not send successfully" });
    // let _id = req.body._id;
    console.log(payload, "payload");
    const user = await User_Login_Schema.findOne({ _id });
    const fcm = new FCM(serverKey);
    console.log("serverKey", user.fcm_token);
    const message = await {
      to: user.fcm_token,
      notification: {
        title: payload.title,
        body: payload.text,
      },
    };

    await fcm.send(message, function (err, response) {
      if (response) {
        console.log(response);
        return res.status(200).json({ notification: "send successfully" });
      } else {
        console.log("not Send", err);
        return res.status(400).json({ notification: "not send successfully" });
      }
    });
  } catch (error) {
    console.log("error in notification", error);
    return res.status(500).json({error})
  }
};

// forget password--
// (Send otp)

const digits = (num, count) => {
  if (num) {
    return digits(Math.floor(num / 10), ++count);
  }
  return count;
};

const otpGenerate = async (req, res) => {
  var otp = Math.floor(10000 + Math.random() * 900000);
  let count = 0;
  count = await digits(otp, count);
  console.log(count);
  if (count === 6) {
    return otp;
  } else {
    if (count === 7) {
      otp = otp - 1000000;
    }
    if (count === 5) {
      otp = (await otp) + 100000;
    }
    count = 0;
    count = await digits(otp, count);
    if (count === 6) {
      return otp;
    }
    return res.status(400).json({ error: "Please retry" });
  }
};

exports.userForgetPass = async (req, res) => {
  try {
    console.log("userForgetPass");
    // let _id = req.params.id;
    const { mobile } = await req.body;
    // const { mobile } = await req.user
    if (!mobile) return res.status(500).json({ message: "missing detail" });
    console.log(mobile);
    let result = await User_Login_Schema.findOne({ mobile });
    if (!result) return res.status(401).json({ message: "invalid user" });

    // var otp = () => Math.floor(Math.random() * 1000900 + 400);

    let otp = await otpGenerate(req, res);
    let check = otp.toString();
    console.log(otp, "before");
    if (check.length !== 6) {
      otp = 369369;
    }
    console.log(otp, "after");
    let view = await sendSms.sendSms(otp, mobile);
    console.log(view);
    if (view === true) {
      let sendOtp = await User_Login_Schema.findByIdAndUpdate(
        { _id: result._id },
        { otp },
        { new: true }
      ).select("-password");
      // console.log(sendOtp);
      if (!sendOtp)
        return res.status(500).json({ message: "Internal Server Error" });
      return res.status(200).json({ sendOtp: "Successfully send" });
    } else {
      return res.status(500).json({ sendOtp: "otp Not send" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({error})
  }
};

exports.checkotp = async (req, res) => {
  try {
    console.log("checkotp");
    let { otp, mobile } = req.body;
    otp = await parseInt(otp);
    // const { mobile } = req.user
    let respose = await User_Login_Schema.findOne({ mobile: mobile });
    if (respose) {
      if (otp === respose.otp) {
        let options = {
          id: respose._id,
        };
        return res.status(200).json({
          message: "opt verified",
          user_id: respose._id,
        });
      } else {
        return res.status(404).json({ message: "opt not verified" });
      }
    }
    return res.status(500).json({ message: "not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({error})
  }
};

// forget password (create password)
exports.createNewPassword = async (req, res) => {
  try {
    let { confrimPassword, password, mobile } = req.body;
    // const { _id } = req.user
    if (!mobile) return res.status(401).json({ error: "unauthorised user" });
    if (!confrimPassword || !password)
      return res.status(500).json({ error: "please enter valid feilds" });
    if (confrimPassword !== password) {
      return res
        .status(500)
        .json({ error: "both password field must be same" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const secretPassword = await bcrypt.hash(password, salt);
      // console.log(secretPassword);
      let check = await User_Login_Schema.findOne({ mobile });
      if (check.otp > 0) {
        let otp = 0;
        let result = await User_Login_Schema.findOneAndUpdate(
          { mobile },
          { password: secretPassword, otp }
        ).select("-password");
        if (!result)
          return res.status(500).json({ message: "something went wrong" });
        return res
          .status(200)
          .json({ message: "Password change successfully" });
      }
      return res
        .status(200)
        .json({ message: "U don't have access to change password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({error})
  }
};

// change password---
exports.changePassword = async (req, res) => {
  try {
    console.log(req.user);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "place validate fields ",
        errors: errors,
      });
    } else {
      let payload = req.body;
      let user_id = req.user.id;
      let oldPassword = payload.password;
      let newPassword = payload.newPassword;
      let respose = await User_Login_Schema.findOne({ _id: user_id });
      let checkPassword = await bcrypt.compare(oldPassword, respose.password);
      if (!checkPassword) {
        return res.status(404).json({ message: "old password is incorrect" });
      } else {
        const secretPassword = await bcrypt.hash(newPassword, 10);
        let result = await User_Login_Schema.findByIdAndUpdate(
          { _id: user_id },
          { password: secretPassword }
        ).catch((error) => {
          return res.status(500).json({error})
        });
        return res.status(200).json({
          message: "password successfully updated",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

exports.pushNotification = async (req, res) => {
  try {
    let payload = req.body;
    let _id = req.body._id;
    console.log(payload, "payload");
    const user = await User_Login_Schema.findById({ _id });
    console.log(user, "user");
    var notification = {
      title: payload.title,
      text: payload.text,
    };
    var fcm_token = [];
    fcm_token.push(payload.token);
    // for(var i=0; i<user.length;i++){
    //     fcm_token.push(user[i].fcm_token)
    // }
    var notification_key = {
      notification: notification,
      registration_ids: fcm_token,
    };
    console.log(notification_key, "send");
    await axios
      .post("https://httpbin.org/post", notification_key, {
        headers: {
          // 'application/json' is the modern content-type for JSON, but some
          // older servers may use 'text/json'.
          // See: http://bit.ly/text-json
          Authorization: `key=${process.env.firebase_msg_key}`,
          "content-type": "text/json",
        },
      })
      .then((res) => {
        console.log("send :");
      })
      .catch((error) => {
        console.log("err");
        return res.status(500).json({error})
      });
  } catch (error) {
    console.log("err");
    return res.status(500).json({error})
  }
};

exports.pushNotificationToAll = async (req, res) => {
  try {
    let payload = req.body;
    if (!payload)
      return res.status(400).json({ error: "not send successfully" });
    const user = await User_Login_Schema.find().select("-password");
    // console.log(user, "user");
    if (user) {
      const fcm = new FCM(serverKey);
      user.map(async (x, n) => {
        console.log(payload, "payload");
        const message = await {
          to: x.fcm_token,
          notification: {
            title: payload.title,
            body: payload.text,
          },
        };
        console.log(x.fcm_token);
        await fcm.send(message, function (err, response) {
          if (response) {
            console.log(response);
          } else {
            console.log("not Send", x.name, err);
          }
        });
      });
      return res.status(200).json({ notification: "send successfully" });
    }
    return res.status(400).json({ error: "not send successfully" });
  } catch (error) {
    console.log("err");
    return res.status(500).json({error})
  }
};

const percentage = async (payload, req, res) => {
  try {
    let comm = await payload.commission;
    const plan = await payload.plan;
    const commission = ((await plan) * comm) / 100;
    return commission;
  } catch (error) {
   return res.status(500).json({error});
  }
};
