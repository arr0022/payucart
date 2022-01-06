const mongoose = require('mongoose');
const { Schema } = mongoose;

const PackageSchema = new Schema({
    plan:{
        type: Number,
        required: [true,'this fields required'],
        unique: true,
    },
    dailyAds:{
        type: Number,
        required: [true, 'this fields required'],
    },
    commission:{
        type: Number,
        required: [true,'this fields required']
    },
    expireIn:{
        type: Number,
        required: [true,'this fields required']
    },
    totalROI:{
        type: Number,
        required: [true,'this fields required']
    },

  });
  const Package = mongoose.model('package', PackageSchema);
  module.exports = Package;