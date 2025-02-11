const URL = require("../models/urlModel")

const createShortId = async(req,res)=>{
    const { nanoid } = await import("nanoid");
    const {url} = req.body
    if(!url){
        return res.status(400).json({success : false,message : "Url is required"})
    }
    const shortId = nanoid(8)
    await URL.create({
        shortId : shortId,
        redirectUrl : url,
        urlHistory : []
    })
    return res.status(200).json({id : shortId})
}

const redirectToPage = async(req,res)=>{
    const {shortId} = req.params
    const entry = await URL.findOneAndUpdate(
        {shortId : shortId},
        {$push : {urlHistory : {timeStamp : Date.now().toString()}}},
        {new : true}
    )
    res.redirect(entry.redirectUrl)
}

const getAnalytics = async(req,res)=>{
    const {shortId} = req.params
    const analytics = await URL.findOne({shortId :shortId})
    if (!analytics) {
        return res.status(404).json({ success: false, message: "Short URL not found" });
    }

    return res.status(200).json({ visitCount: analytics.urlHistory.length, data: analytics.urlHistory });
}

module.exports = {createShortId,redirectToPage,getAnalytics}