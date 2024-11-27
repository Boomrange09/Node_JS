const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    console.log(body);
    if(!body.url){
        return res.status(400).json({error : "url is required"})
    } 
    const shortID = shortid();
    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : [],  
    });

    return res.json({id : shortID });
}

async function handleRedirectURL(req, res){
    const body = req.body;
}

module.exports = {
    handleGenerateNewShortURL,
    handleRedirectURL
}