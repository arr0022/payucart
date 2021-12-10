var config = require("../../key.json");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { PaymentGateway } = require("@cashfreepayments/cashfree-sdk");
const axios = require("axios").default;
const User_Login_Schema = require("../../models/User_Login");

const pg = new PaymentGateway({
  env: config.enviornment,
  apiVersion: "1.0.0",
  appId: process.env.PG_App_ID,
  secretKey: process.env.PG_Secret_Id,
});

exports.verify = async (req, res, next) => {
  try {
    console.log("verify");
    const { _id, name, mobile } = await req.user;
    const id = await _id;
    req.user.id = await id;
    const { amount } = await req.body;
    // console.log(name, mobile);
    // console.log(amount);
    // console.log(typeof amount);
    let createOrderID = await Math.floor(Math.random() * 155560089 + parseFloat(amount));
    req.orderId = await name.concat(mobile, createOrderID.toString());
    req.orderAmount = await parseFloat(amount);
    // console.log(typeof req.orderAmount);
    req.orderCurrency = "INR";
    if (!req.orderAmount || !req.orderId || !mobile || !id) {
      return res
        .status(400)
        .json({
          message: "items missing",
          amount,
          orderId: req.orderId,
          id,
          mobile,
        });
    }
    return next();
  } catch (e) {
    return res.status(401).json({ error: e.message });
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    console.log("createOrder");
    const { name, mobile, _id } = req.user;
    console.log(req.user);
    const { orderId, orderAmount, orderCurrency } = req;
    console.log(orderId, orderAmount, orderCurrency);
    const verify = await PaymentGateway.verifyCredentials({
      env: config.enviornment,
      appId: process.env.PG_App_ID,
      secretKey: process.env.PG_Secret_Id,
    });
    console.log(verify);
    if(!req.body.tranferFor){
      let user = await User_Login_Schema.findById({_id})
      console.log("already have plan");
      console.log(user.plan);
      if(user.plan !== 0) return res.status(403).json({error: "You already have active plan"})
    }
    console.log("after already have plan");
    // console.log(orderNote);
    let returnUrl= ""
    let orderNote = ""
    if(req.body.tranferFor){
      returnUrl= await `${process.env.base}/wallet/${orderId}/${_id}`
      orderNote = await name.concat(mobile, " Wallet transaction ", orderAmount);
    }
    else{
      returnUrl= await `${process.env.base}/payments/${orderId}/${_id}`
      orderNote = await name.concat(mobile, " plan ", orderAmount);
    }
    
    const order = await pg.orders.createOrders({
      orderId,
      orderAmount,
      orderCurrency,
      orderNote,
      customerName: name,
      customerPhone: mobile,
      customerEmail: process.env.Email,
      returnUrl,
    });
    if (!order) return res.status(500).json({ error: 'order not created'});
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: error.message });
  }
};

exports.getOrderLink = async (req, res, next) => {
  try {
    // console.log("link");
    const { orderId } = req;
    // console.log("link", orderId);
    const orderLink = await pg.orders.getLink({ orderId });
    console.log(orderLink);
    return res.status(200).json(orderLink);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
};
