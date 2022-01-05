const mogoose = require('mongoose');
const videoSchema = new mogoose.Schema({
    AdminVideo : {
        type: String,
        required: [true,'this fields required'],
    },
    
    // ImageThumbnailVideo : {
    //     type: String,
    //     required: [true,'this fields required'],
    // }
});

let adminPannelVideo = mogoose.model('adminVideo',videoSchema);

module.exports = adminPannelVideo;