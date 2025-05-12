import express from 'express'
import dotenv from 'dotenv'
import {googlelogin,googlecallback,googlelogout} from  '../controllers/authcontroller.js'

const router=express.Router()


router.get("/",googlelogin);
router.get("/callback",googlecallback)
router.get("/logout",googlelogout)
// router.post()


export default router