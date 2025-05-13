import mongoose from "mongoose";



const projectSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{
    timestamps:true,
})


export const Project=mongoose.model("projectproject",projectSchema)
