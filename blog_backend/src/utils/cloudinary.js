const cloudinary = require('cloudinary').v2
const fs = require('fs')

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUDINARY_APIKEY,
    api_secret : process.env.CLOUDINARY_APISECRET
})

const uploadOnCloudinary = async(localFilepath)=>{
    if(!localFilepath) return null
    try{
        const response = await cloudinary.uploader.upload(localFilepath,{
          resource_type : 'auto'  
        })
        if(response){
            fs.unlinkSync(localFilepath)
            return response.secure_url
        }
    }
    catch(err){
        return null
    }
}

module.exports = uploadOnCloudinary