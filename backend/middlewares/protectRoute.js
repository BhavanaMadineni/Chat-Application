const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

require("dotenv").config();

exports.protectRoute = async (req, res, next)=>{
    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({error:"Unauthorized- no token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SERCRET);

        if(!decoded){
            return res.status(401).json({error:"Unauthorized- Invalid token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({error:"User not found"});
        }

        req.user = user; 

        next();   
    }
    catch(err){
        console.log("error in protected route middleware", err.message)
        res.status(500).json({error:"Internal server error"})
    }
}