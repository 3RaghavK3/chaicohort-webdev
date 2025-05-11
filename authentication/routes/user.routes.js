import express from 'express'
import {register,verifyemail,login,resendVerificationEmail,getprofile,logout} from '../controllers/user.controller.js'
import isloggedin from '../middleware/isloggedin.js';





const router=express.Router();



router.post("/register",register);
router.post("/login",login);
router.get("/verify/:token",verifyemail)
router.post('/reverify/:token', resendVerificationEmail);
router.get("/profile",isloggedin,getprofile)
router.post("/logout",isloggedin,logout)


export default router