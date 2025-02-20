const nodemailer = require('nodemailer')

const sendEmail = async(receiverEmail,subject,message)=>{
    const transpoter = nodemailer.createTransport({
        service : 'gmail',
        secure : true,
        port : process.env.SMTP_PORT || 587,
        auth : {
            user : process.env.SMTP_USERNAME,
            pass : process.env.SMTP_PASSWORD
        }
    })
    try{
        await transpoter.sendMail({
            from : process.env.SMTP_FROM_EMAIL,
            to : receiverEmail,
            subject : subject,
            text : message
        })
        return true
    }
    catch(err){
        console.log(`Error while send email : ${err.message}`)
        return false
    }
}

module.exports = sendEmail