import mongoose  from "mongoose";
import dotenv from 'dotenv'


dotenv.config()

const db=async()=>{
    try{    
        await mongoose.connect(process.env.MONGO_URL)
    }
    catch(err){
        throw err
    }
}


export default db