import express from 'express'
import {register,verifyemail,login,resendVerificationEmail} from '../controllers/user.controller.js'




const router=express.Router();



router.post("/register",register);
router.post("/login",login);
router.get("/verify/:token",verifyemail)
router.post('/reverify/:token', resendVerificationEmail);



export default router