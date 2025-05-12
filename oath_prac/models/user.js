import mongoose from "mongoose";

const user_schema=new mongoose.Schema({
    name:String,
    email:String,
    googleid:String,
    refreshToken:String,

},{
    timestamps:true
})


const User=mongoose.model("User1",user_schema)


const create_user=async(name,email,googleid,refreshToken)=>{
    try{
        return await User.create({
        name,email,googleid,refreshToken
            })
    }
    catch(err){
        console.error(err.message)
    }
   
}
export {User,create_user}