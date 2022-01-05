const mongoose = require('mongoose');

const watch_video_user = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'adminVideos',
    },
},{ timestamps: true });
module.exports = mongoose.model('watch_video_user', watch_video_user);