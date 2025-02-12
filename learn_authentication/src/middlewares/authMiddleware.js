const jwt = require('jsonwebtoken')

const isloggedIn = async(req,res,next)=>{
    const {authCookie} = req.cookies

    if(!authCookie){
        return res.status(400).json({
            success : false,
            message : "User not authenticated"
        })
    }

    try{
        const isVerified = jwt.verify(authCookie,process.env.JWT_SECRET)
        if(!isVerified){
            return res.status(400).json({
                success : false,
                message : "User not verified"
            })
        }
        const decodedData = jwt.decode(authCookie)
        req.user = decodedData
        next()
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to verify user"
        })
    }
}

const isAuthorized = (...allowedRoles)=>{
    return (req,res,next)=>{
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                success : false,
                message : "User is not authorized to access this page"
            })
        }
        next()
    }
}

module.exports = {isloggedIn,isAuthorized}