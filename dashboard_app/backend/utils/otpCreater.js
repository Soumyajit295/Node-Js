const { customAlphabet } = require("nanoid")

const otpCreater = ()=>{
    const nanoid = customAlphabet('0123456789',4)
    const otp = nanoid()
    return otp
}

module.exports = otpCreater