const mogoose = require('mongoose');
const bannerSchema = new mogoose.Schema({
    bannerImage : {
        type: String
    }
});

let Banner = mogoose.model('bannerImage',bannerSchema);

module.exports = Banner;