const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.generateTokenAndSetCookie = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SERCRET,{
        expiresIn: '15d'
    })

    res.cookie("jwt", token,{
        maxAge: 15 *24*60*60*1000,
        httpOnly: true,
        sameSIte: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
}
