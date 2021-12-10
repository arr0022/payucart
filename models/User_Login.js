const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-async-await');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "this fields required"],
  },
  mobile: {
    type: String,
    required: [true, "this fields required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "this fields required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "InActive",
  },
  otp: {
    type: Number,
    default: 0,
  },
  perDayAddLimit: {
    type: Number,
    default: 0,
  },
  plan: {
    type: Number,
    default: 0,
  },
  planExpireOn: {
    type: Number,
    default: 0,
  },
  beneficiary: {
    type: String,
    default: "false",
  },
  commission: {
    type: Number,
    default: 0,
  },
  totalROI: {
    type: Number,
    default: 0,
  },
  referCode: {
    type: String,
    required: [true, "this fields required"],
    unique: true,
  },
  referBy: {
    type: String,
    default: "None",
  },
  wallet: {
    type: String,
    default: '0',
  },
  fcm_token: {
    type: String,
    required: [true, "this fields required"],
    default: "None",
  },
  profile: {
    type: String,
    default: "None",
  },
  tEarning: {
    type: String,
    default: '0',
  },
  yEarning: {
    type: String,
    default: '0',
  },
  tcomplete: {
    type: Number,
    default: 0,
  }
});

UserSchema.plugin(mongoosePaginate);

const User_Login_Schema = mongoose.model("user", UserSchema);
module.exports = User_Login_Schema;
