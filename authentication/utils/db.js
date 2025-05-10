import mongoose from  'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const db=()=>{
    return mongoose.connect(process.env.MONGODB_URL)
}

export default db;