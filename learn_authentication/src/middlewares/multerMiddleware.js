const multer = require('multer')

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'src/uploads')
    },
    filename : (req,file,cb)=>{
        console.log("File property : ",file)
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({
    storage : storage,
    limits : {fileSize : 5*1024*1024} // upto 5mb
})

module.exports = upload