const fs = require('fs')

let convertImage = (data,fileName,type) =>{
    return new Promise((resolve,reject)=>{
        let buff = new Buffer.from(data, 'base64');
        let file = fileName+"_"+Date.now()+"."+type
        fs.writeFileSync('upload/profile/'+file, buff);
        resolve(file)
    })
}

// --------------- convertImage---------------
module.exports = convertImage;
