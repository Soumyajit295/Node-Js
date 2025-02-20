const cloudinary = require('cloudinary').v2
const fs = require('fs')

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUDINARY_APIKEY,
    api_secret : process.env.CLOUDINARY_APISECRET
})

const uploadOnCloudinary = async(localFilePath)=>{
    if(!localFilePath) return null
    try{
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type : 'auto'})
        if(response){
            fs.unlinkSync(localFilePath)
            return response.secure_url
        }
        else{
            return null
        }
    }
    catch(err){
        return null
    }
}

module.exports = uploadOnCloudinary