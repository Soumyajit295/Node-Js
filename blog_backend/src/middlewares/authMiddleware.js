const jwt = require('jsonwebtoken')

const isLoggedIn = async(req,res,next)=>{
    const jwtToken = req.cookies.jwtToken
    if(!jwtToken){
        return res.status(400).json({
            success : false,
            message : "User is not logged in"
        })
    }
    try{
        const validateToken = jwt.verify(jwtToken,process.env.JWT_SECRET)
        if(!validateToken){
            return res.status(400).json({
                success : fale,
                message : "User is not authenticated"
            })
        }
        const decodeToken = jwt.decode(jwtToken)
        req.user = decodeToken
        next()
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to validate the user"
        })
    }
}

module.exports = isLoggedIn