require("dotenv").config();
const axios = require("axios").default;
const connectToMongo = require("./Config/db.js");
const express = require("express");
var config = require("./key.json");
const cors = require("cors");
const { PaymentGateway } = require("@cashfreepayments/cashfree-sdk");
const pug = require("pug");
const path = require("path");
const User_Login_Schema = require("./models/User_Login");
const User_Transaction_Schema = require("./models/Transaction");
const Package = require("./models/Packages");
const cron = require("node-cron");
const http = require("http");

connectToMongo.connect();
const app = express();
const port = 5000;
app.use(cors());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
const server = http.createServer(app);
// app.set("views", path.join(__dirname, "views/assets"));
app.use(express.json());

app.use("/banner", express.static(__dirname + "/upload/images"));
app.use("/videos", express.static(__dirname + "/upload/videos"));
app.use("", express.static(__dirname + "/upload/"));
// app.use("/payment",express.static(__dirname + '/view'));

// Available Routes
app.use("/auth", require("./authrization/routes/authUser"));
app.use("/admindata", require("./authrization/routes/admindata"));
// app.use('/image', require('./routes/banner'))

// Callback payment URL
app.post("/payments/:orderId/:_id", async (req, res) => {
  try {
    // console.log(req);
    console.log("AFTER");
    const pg = await new PaymentGateway({
      env: config.enviornment,
      apiVersion: "1.0.0",
      appId: process.env.PG_App_ID,
      secretKey: process.env.PG_Secret_Id,
    });
    const response = await pg.orders.getStatus({
      orderId: req.params.orderId, // required
    });
    console.log(response);
    if (response.txStatus === "SUCCESS") {
      console.log("SUCCESS");
      const _id = req.params._id;
      // console.log(_id);
      let plan = Math.floor(response.orderAmount);
      let packagess = await Package.findOne({ plan });
      // console.log(packagess);
      if (packagess) {
        plan = packagess.plan;
        // console.log(plan);
        let DateNow = new Date();
        let expireIn = packagess.expireIn;
        let perDayAddLimit = packagess.dailyAds;
        let commission = packagess.commission;
        let date = DateNow.setDate(DateNow.getDate() + expireIn);
        const planExpireOn = new Date(date);
        // console.log(date);
        let use = await User_Login_Schema.findById({ _id });
        if (use.plan <= 0) {
          const user = await User_Login_Schema.findByIdAndUpdate(
            { _id },
            {
              plan,
              planExpireOn,
              perDayAddLimit,
              commission,
              status: "active",
            },
            { new: true }
          ).select("-password");
          if (user) console.log(user);
        }
      }
      let users = _id;
      let remark = `Thanks for buying our plan`;
      let addTransaction = User_Transaction_Schema.create({
        users,
        remark,
        amount: plan,
      });
      console.log(addTransaction);
      return res.status(200).render("success", {
        message: `We received your Payment successfully`,
        subMessage: `Thanks for buying our package!`,
      });
    } else if (response.txStatus === "FAILED") {
      console.log("failed");
      return res.status(200).render("failed");
    }
    return res.status(200).render("failed");
    // console.log(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).render("failed");
  }
});

// Callback Wallet URL
app.post("/wallet/:orderId/:_id", async (req, res) => {
  try {
    // console.log(req);
    console.log("AFTER Wallet");
    const pg = await new PaymentGateway({
      env: config.enviornment,
      apiVersion: "1.0.0",
      appId: process.env.PG_App_ID,
      secretKey: process.env.PG_Secret_Id,
    });
    const response = await pg.orders.getStatus({
      orderId: req.params.orderId, // required
    });
    console.log(response);
    if (response.txStatus === "SUCCESS") {
      console.log("SUCCESS");
      const _id = req.params._id;
      let user = await User_Login_Schema.findById({ _id }).select("-password");
      let money = response.orderAmount;
      let wallet = parseFloat(user.wallet) + parseFloat(money);
      wallet = wallet.toString();
      let r = wallet.indexOf(".");
      if (r !== -1) {
        wallet = wallet.replace(wallet.slice(wallet.indexOf(".") + 2), "");
      }
      let walletUser = await User_Login_Schema.findOneAndUpdate(
        { _id },
        { wallet },
        { new: true }
      ).select("-password");
      let users = _id;
      let remark = `Add money to wallet`;
      let amount = response.orderAmount;
      let addTransaction = await User_Transaction_Schema.create({
        users,
        remark,
        amount,
      });
      if (walletUser && addTransaction)
        return res.status(200).render("success", {
          message: `We received ${response.orderAmount} successfully`,
          subMessage: `Thanks for using our app!`,
        });
      if (!walletUser)
        return res.status(400).render("success", {
          message: `We received ${response.orderAmount} successfully`,
          subMessage: `Due to some technical issue your amount is not added to your wallet please contact our customer care`,
        });
    } else if (response.txStatus === "FAILED") {
      console.log("failed");
      return res.status(200).render("failed");
    }
    return res.status(200).render("failed");
    // console.log(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
    // res.status(400).json({ error: error.message });
  }
});
// app.post("/")
// About page URL
app.get("/about", (req, res) => {
  try {
    return res.redirect("http://www.adsgrocy.com/about");
    // console.log(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ e });
  }
});

app.get("/app-ads.txt", (req, res) => {
  try {
    return res.status(200).render("app-ads");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});
// About term&condition URL
app.get("/term&condition", async (req, res) => {
  try {
    return res.redirect("http://www.adsgrocy.com/TermAndCondition");
    // console.log(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

// About privacy URL
app.get("/privacy", async (req, res) => {
  try {
    return res.redirect("http://www.adsgrocy.com/privacy");
    // console.log(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

cron.schedule("* * * * *", async () => {
  try {
    let user = await User_Login_Schema.find({ plan: { $gte: 1 } });
    user.map(async (x, n) => {
      let a = new Date();
      let b = new Date(x.planExpireOn);
      let c = b - a;
      // console.log(x.name);
      if (c <= 0) {
        let changes = {
          plan: 0,
          perDayAddLimit: 0,
          planExpireOn: 0,
          commission: 0,
          status: "InActive",
        };
        User_Login_Schema.findByIdAndUpdate({ _id: x._id }, changes)
          .then((res) => {
            console.log(res.name, "Plan Expire");
          })
          .catch((error) => {
            // console.log(err, "err");
            return res.status(500).json({ error });
          });
        // console.log(changes);
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

cron.schedule("5 5 0 * * *", async () => {
  try {
    let user = await User_Login_Schema.find({ plan: { $gte: 1 } });
    user.map(async (x, n) => {
      let changes = { perDayAddLimit: 1 };
      await Package.findOne({ plan: x.plan })
        .then((res) => {
          console.log(res.dailyAds, "res.dailyAds");
          changes = {
            perDayAddLimit: res.dailyAds,
            tEarning: 0,
            tcomplete: 0,
            yEarning: x.tEarning,
          };
        })
        .catch((error) => {
          console.log("package err", error);
          return res.status(500).json({ error });
        });
      await User_Login_Schema.findByIdAndUpdate({ _id: x._id }, changes, {
        new: true,
      })
        .then((res) => {
          console.log(res, "addlimit");
          console.log(changes);
        })
        .catch((error) => {
          console.log(error, "err");
        });
      // console.log(changes);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

// app.get('/',(req,res)=>{
//   res.send('welocme')
// })

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "./build")));

// Handle GET requests to /api route
// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build", "index.html"));
});
// server
server.listen(process.env.PORT || 3000, () => {
  console.log(`backend listening at port:${process.env.PORT}`);
});

//app.listen(3000, '127.0.0.1');
