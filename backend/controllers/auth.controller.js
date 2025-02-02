const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateTokenAndSetCookie } = require("../utils/generateToken");
exports.signup = async (req,res)=>{
    try{
        const {fullName, username, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Passwords don't match!"
            })
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({
                success: false,
                message: "User already exists!"
            })
        }

        const dummyPassword = password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            dummyPassword: dummyPassword,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic: girlProfilePic,
        })
        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            return res.status(200).json({
                success: true,
                data: newUser,
                message: "New user created"
            })
        }
        else{
            res.status(400).json({error: "Invalid user data"});
        }

        
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error during signUp"})
    }
}

exports.login = async (req,res)=>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!isPasswordCorrect || !user){
            return res.status(400).json({error:" Invalid username or password"})
        }

        generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({
            success:true,
            data: user,
            message: "User loggedin succesfully"
        })

    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message: "Error while trying to login"
        })
    }
}

exports.logout = async (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge: 0});
        return res.status(200).json({message: "Logged out succesfully"});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message: "Error while trying to logout"
        })
    }
}

