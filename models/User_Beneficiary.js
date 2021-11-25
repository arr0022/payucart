const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserBeneficiarySchema = new Schema({
  beneId: {
    type: String,
    required: [true, "this fields required"],
  },
  name: {
    type: String,
    required: [true, "this fields required"],
  },
  phone: {
    type: String,
    required: [true, "this fields required"],
  },
  address1: {
    type: String,
    required: [true, "this fields required"],
  },
  city: {
    type: String,
    required: [true, "this fields required"],
  },
  state: {
    type: String,
    required: [true, "this fields required"],
  },
  pincode: {
    type: String,
    required: [true, "this fields required"],
  },
  ifsc: {
    type: String,
    required: [true, "this fields required"],
  },
  bankAccount: {
    type: String,
    required: [true, "this fields required"],
  },
  vpa: {
    type: String,
    required: [true, "this fields required"],
  },
});
const User_Beneficiary = mongoose.model(
  "UserBeneficiary",
  UserBeneficiarySchema
);
module.exports = User_Beneficiary;
