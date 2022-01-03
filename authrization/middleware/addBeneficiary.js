// const cfSdk = require("cashfree-sdk");
const User_Login_Schema = require("../../models/User_Login");
const User_Beneficiary = require("../../models/User_Beneficiary");
const axios = require("axios").default;
const User_Transaction_Schema = require("../../models/Transaction");

const testUrl = process.env.Beneficiary;
const email = process.env.Email;

const options = {
  method: "POST",
  url: `${testUrl}/payout/v1/authorize`,
  headers: {
    Accept: "application/json",
    "X-Client-Secret": process.env.PayClientSecret,
    "X-Client-Id": process.env.PayClientID,
  },
};

exports.authorize = (req, res, next) => {
  console.log("aenter");
  console.log(options);
  axios
    .request(options)
    .then(function (response) {
      console.log("26", response.data);
      if (response.data.subCode === "403") {
        return res.status(500).json({ error: "Internal server error" });
      }
      console.log("here");
      req.url = `${testUrl}/payout/v1/verifyToken`;
      req.token = response.data.data.token;
      return next();
      // res.json({response: response.data})
    })
    .catch(function (error) {
      // console.error(e);
      return res.status(500).json({ error });
    });
};

exports.verify = async (req, res, next) => {
  // trycatch
  console.log("venter");
  console.log(options);
  axios
    .request({
      method: "POST",
      url: req.url,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${req.token}`,
      },
    })
    .then(function (response) {
      console.log("response verify");
      console.log(response.data);
      next();
    })
    .catch(function (error) {
      console.log("response not verify");
      // console.error(er);
      return res.status(500).json({ error });
    });
};

exports.validateBeneficiary = async (req, res, next) => {
  try {
    console.log("validateBeneficiary", req.body);
    const { _id } = req.user;
    const id = await _id.toString();
    console.log(id);
    req.user.id = id;
    let beneficiary = await User_Beneficiary.findOne({ beneId: id });
    if (beneficiary) {
      if (req.body.amount) {
        return next();
      }
      console.log("beneficiary");
      let user = await User_Login_Schema.findById({ _id });
      if (user.beneficiary === false) {
        user = await User_Login_Schema.findByIdAndUpdate(
          { _id },
          { beneficiary: "true" },
          { new: true }
        ).select("-password");
        // console.log(user);
        return res.status(400).json({ User_Beneficiary: "Already Exist" });
      }
      return res.status(400).json({ User_Beneficiary: "Already Exist" });
    }
    console.log("not beneficiary");
    return next();
  } catch (error) {
    // console.log(e.message);
    return res.status(500).json({ error });
  }
};

exports.createBeneficiary = async (req, res) => {
  try {
    console.log("createBeneficiary");
    const { id } = req.user;
    console.log(id);
    const {
      ifsc,
      bankAccount,
      vpa,
      name,
      phone,
      city,
      state,
      pincode,
      address1,
    } = req.body;

    // console.log(id);
    const beneId = id;
    if (
      !ifsc ||
      !bankAccount ||
      !vpa ||
      !name ||
      !phone ||
      !city ||
      !state ||
      !pincode ||
      !address1
    ) {
      return res.status(400).json({ message: "detail missing" });
    }
    // console.log(typeOf(beneId));
    const benis = {
      ifsc,
      bankAccount,
      vpa,
      beneId,
      name,
      email,
      phone,
      address1,
      city,
      state,
      pincode,
    };
    const bene = {
      ifsc,
      bankAccount,
      vpa,
      beneId,
      name,
      phone,
      address1,
      city,
      state,
      pincode,
    };
    // console.log(bene);
    // addbeni(req,);
    const response = await axios.request({
      method: "POST",
      url: `${testUrl}/payout/v1/addBeneficiary`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${req.token}`,
        "Content-Type": "application/json",
      },
      data: benis,
    });
    if (response.data.status === "SUCCESS") {
      const beneficiary = new User_Beneficiary(bene);
      const beni = await beneficiary.save();
      // console.log(response.data);
      if (beni) {
        let user = await User_Login_Schema.findOneAndUpdate(
          { _id: beneId },
          { beneficiary: "true" },
          { new: true }
        ).select("-password");
        console.log(user);
        // return res.status(200).json({User_Beneficiary: user})
      }
      console.log({ User_Beneficiary: beni });
      return res.status(200).json({ User_Beneficiary: beni });
    } else {
      console.log(response.data, "response.data");
      return res
        .status(response.data.subCode)
        .json({ User_Beneficiary: response.data.message });
    }
  } catch (error) {
    // console.log(err);
    return res.status(500).json({ error });
  }
};

exports.PayU = async (req, res) => {
  try {
    console.log("Payu");
    const { _id } = req.user;
    // console.log(id);
    if (!_id) return res.status(400).json({ error: "Internal Server error" });
    const beneId = _id;
    const { amount, transferMode } = req.body;
    const { token } = req;
    // console.log(token)
    if (!token || !amount || !transferMode || !beneId)
      return res.status(400).json({
        error: "Pay Items are missing",
        token,
        amount,
        transferMode,
        beneId,
      });
    // Mode of transfer, banktransfer by default. Allowed values are: banktransfer, upi, paytm, amazonpay, and card.
    const user = await User_Login_Schema.findOne({ _id }).select("-password");
    console.log(user);

    let WithdrawAmt = parseFloat(amount);
    let walletBal = parseFloat(user.wallet);

    if (WithdrawAmt > walletBal && walletBal !== WithdrawAmt) {
      return res.status(400).json({
        error: "can't accept this withdraw request",
        WithdrawAmt,
        wallet: user.wallet,
      });
    }
    WithdrawAmt = parseFloat(amount);
    const trId = Math.floor(Math.random() * 137461805669728 * WithdrawAmt);
    const transferId = trId.toString();
    const remarks = `Withdraw from wallet`;
    console.log(beneId, WithdrawAmt, transferId, transferMode, remarks);
    const response = await axios.request({
      method: "POST",
      url: `${testUrl}/payout/v1/requestTransfer`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { beneId, amount: WithdrawAmt, transferId, transferMode, remarks },
    });

    if (!response) {
      console.log(response.data);
      return res.status(500).json({ error: "Internal Server pay error" });
    }
    console.log("after");
    // let users = await _id;
    let wallet = parseFloat(user.wallet) - parseFloat(WithdrawAmt);
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
    let addTransaction = await User_Transaction_Schema.create({
      users: _id,
      remark: `Withdraw money from wallet`,
      amount,
    });
    if (addTransaction && walletUser) {
      // console.log({message: response.data});
      return res.status(200).json(response.data);
    }
    return res.status(500).json({ error: "Internal Server error" });
  } catch (error) {
    // console.error(error, "ethis");
    return res.status(500).json({ error });
  }
};

// const validbeni = async (id, req, res) => {
//   try {
//     const response = await axios.request({
//       method: "GET",
//       url: `${testUrl}/payout/v1/getBeneficiary/${id}`,
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${req.token}`,
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     console.log("err caught in getting beneficiary details");
//     return res
//       .status(400)
//       .json({ error: e.message || "Need to create Beneficiary Account" });
//   }
// };

// const addbeni = () => {

// }
