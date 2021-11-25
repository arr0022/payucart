// const multer = require('multer');
// const path  = require("path")
// const util = require("util");

// ------------ multer ------------------

// const storage = multer.diskStorage({
//     destination:'./upload/images/',
//     filename: (req, file, cd) => {
//         const match = ["image/png", "image/jpeg"];
//         if (match.indexOf(file.mimetype) === -1) {
//           var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
//           return cd(message, null);
//         }
//         cd(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// });

// const upload = multer({
//     storage:storage,
// })
const multer = require('multer');
const path  = require("path");
// ------------ multer ------------------
const storage = multer.diskStorage({
    destination:'./upload/images/',
    filename:(req,file,cd)=>{
        return cd(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage:storage,
    limit:{fileSize:20}
});


// --------------- End multer ---------------
module.exports = upload;


// --------------- End multer ---------------
// module.exports = upload;