import User from '../models/user.js'
import crypto from 'crypto'
import sendverificationmail from '../utils/sendmail.js'
import dotenv from 'dotenv'
import { access } from 'fs';

dotenv.config();

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Minimum password length is 6",
        });
    }

    try {
        let existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        const token = crypto.randomBytes(32).toString("hex");
        const tokenExpiry = Date.now() + 1000 * 35;

        let newUser = await User.create({
            name,
            email,
            password,
            verificationToken: token,
            verificationTokenExpiry: tokenExpiry,
        });

        await sendverificationmail(email, token);

        return res.status(201).json({
            token: token,
            success: true,
            message: "User registered successfully. Verification email sent.",
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "An error occurred: " + err.message,
        });
    }
};

const verifyemail = async (req, res) => {
    try {
        const token = req.params.token;

        const matchingUser = await User.findOne({ verificationToken: token });
        if (matchingUser) {
            if (matchingUser.verificationTokenExpiry - new Date() > 0) {
                matchingUser.isVerified = true;
                matchingUser.verificationToken = null;
                matchingUser.verificationTokenExpiry = null;
                await matchingUser.save();

                return res.status(200).json({
                    success: true,
                    message: "User verified",
                });

            } else {
                return res.status(422).json({
                    success: false,
                    message: "Token expired",
                });
            }
        } else {
            return res.status(422).json({
                success: false,
                message: "User not found",
            });
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "An error occurred: " + err.message,
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required",
        });
    }

    try {
        let matchingUser = await User.findOne({ email });
        if (matchingUser) {
            if (matchingUser.isVerified) {
                let isPassCorrect = await matchingUser.comparePassword(password);

                if (isPassCorrect) {


                    let accesstoken=matchingUser.generateJWT(process.env.ACCESS_SECRET,process.env.ACCESS_EXPIRY);
                    let refreshtoken = matchingUser.generateJWT(process.env.REFRESH_SECRET,process.env.REFRESH_EXPIRY);
                    
                    matchingUser.refreshtoken=refreshtoken;
                    await matchingUser.save();

                    const cookieOptions = {
                        httpOnly: true,
                    };
                    res.cookie("accesstoken", accesstoken, cookieOptions);
                    res.cookie("refreshtoken", refreshtoken, cookieOptions);
                    
                    return res.status(200).json({
                        success: true,
                        message: "Login successful",
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "Wrong password",
                    });
                }

            } else {
                return res.status(403).json({
                    success: false,
                    message: "Please verify your email before logging in",
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "User not found. Please register first.",
            });
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "An error occurred: " + err.message,
        });
    }
};

const resendVerificationEmail = async (req, res) => {
    try {
        const expiredtoken = req.params.token;
        const matchingUser = await User.findOne({ verificationToken: expiredtoken });
        if (!matchingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found with this token",
            });
        }
        const token = crypto.randomBytes(32).toString("hex");
        const tokenExpiry = Date.now() + 1000 * 35;
        matchingUser.verificationToken = token;
        matchingUser.verificationTokenExpiry = tokenExpiry;
        await matchingUser.save();
        await sendverificationmail(matchingUser.email, token);
        return res.status(200).json({
            success: true,
            message: "New verification email sent",
            token: token,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error in resending verification: " + err.message,
        });
    }
};


const getprofile=async(req,res)=>{

    const user_id=req.user.id;
    try{
        const user=await User.findOne({_id:user_id}).select("-password")
        return res.status(200).json({
            success:true,
            message:user
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
    

}


const logout=async(req,res)=>{
    res.clearCookie("accesstoken", { httpOnly: true });
    res.clearCookie("refreshtoken", { httpOnly: true });
    return res.status(200).json({
        success:true,
        message:"Logged out ,Log in again"
    })

}

export { register, verifyemail, login, resendVerificationEmail,getprofile,logout };
