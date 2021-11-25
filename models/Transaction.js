const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  users: {
    type: String,
    required: [true, "this fields required"],
  },
  remark: {
    type: String,
    required: [true, "this fields required"],
  },
  amount: {
    type: String,
    required: [true, "this fields required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User_Transaction_Schema = mongoose.model("transaction", TransactionSchema);
module.exports = User_Transaction_Schema;
