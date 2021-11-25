const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReferSchema = new Schema({
    refer:{
        type: Number,
        required: [true,'this fields required'],
    },
  });
  const ReferAmount = mongoose.model('refer', ReferSchema);
  module.exports = ReferAmount;