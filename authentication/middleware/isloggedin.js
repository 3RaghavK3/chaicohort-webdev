import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

const isloggedin = async (req, res, next) => {
    try {
        const accesstoken = req.cookies.accesstoken;
        const refreshtoken = req.cookies.refreshtoken;

        if (!accesstoken || !refreshtoken) {
            return res.status(401).json({
                success: false,
                message: "Log in first",
            });
        }

        try {
         
            const accessdecode =jwt.verify(accesstoken, process.env.ACCESS_SECRET);
            const matchinguser = await User.findOne({ _id: accessdecode.id });

            if (!matchinguser) {
                return res.status(401).json({
                    success: false,
                    message: "User not found",
                });
            }

            req.user = matchinguser; 
            next(); 

        } catch (err) {
            if (err.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Invalid Access, log in properly" });
            }

            // Handle the refresh token case
            try {
                const refreshdecode =jwt.verify(refreshtoken, process.env.REFRESH_SECRET);
                const matchinguser = await User.findOne({ _id: refreshdecode.id });

                if (!matchinguser) {
                    return res.status(401).json({
                        success: false,
                        message: "User not found",
                    });
                }

                req.user = matchinguser; 

                const newaccesstoken = matchinguser.generateJWT(process.env.ACCESS_SECRET, process.env.ACCESS_EXPIRY);
                const cookieOptions = { httpOnly: true };

              
                res.cookie("accesstoken", newaccesstoken, cookieOptions); 

                 next();

            } catch (err) {
                if (err.name === "JsonWebTokenError") {
                    return res.status(401).json({ message: "Invalid Access, log in properly" });
                }

                return res.status(500).json({
                    success: false,
                    message: "Log in again",
                });
            }
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

export default isloggedin;

