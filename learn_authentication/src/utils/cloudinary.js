const cloudinary = require('cloudinary').v2
const fs = require('fs')

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUDINARY_APIKEY,
    api_secret : process.env.CLOUDINARY_APISECRET
})

const uploadOnCloudinary = async(localFilePath)=>{
    try{
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type : 'auto'
        })
        if(response){
            console.log(response)
            fs.unlinkSync(localFilePath)
            return response
        }
    }
    catch(err){
        return null
    }
}

module.exports = uploadOnCloudinary