const mongoose = require('mongoose');
const videoSchema = new mongoose.Schema({
    AdminVideo : {
        type: String,
        required: [true,'this fields required'],
    },
    watchVideo:[
       {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        videoId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'adminVideos',
        }
       }
    ]
    
    // ImageThumbnailVideo : {
    //     type: String,
    //     required: [true,'this fields required'],
    // }
});

let adminPannelVideo = mongoose.model('adminVideo',videoSchema);

module.exports = adminPannelVideo;