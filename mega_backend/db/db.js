import mongoose, { mongo }  from "mongoose";


const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
    }
    catch(err){
        throw err
    }
}


export default connectdb