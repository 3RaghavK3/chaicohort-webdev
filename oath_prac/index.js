import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser  from 'cookie-parser';
import db from './utils/db.js'
import authroute from './routes/authroute.js'

dotenv.config();


const app=express();
const port=process.env.PORT

app.get("/",(req,res)=>{
    res.send("Login first");
    
})

app.use(cors({
    allowedHeaders:['Content-Type','Authorization'],
    methods:['GET','POST','DELETE','UPDATE'],
    origin:process.env.BASE_URL
}))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use('/auth/google',authroute)

db().
then(()=>{
    app.listen(port,()=>{
    console.log("Database connected")
    console.log("Port active on "+ port );

    
})
}).
catch((err)=>{
    console.error(err.message)
})
