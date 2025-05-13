import mongoose, { Schema } from "mongoose";
import { User } from "./user.modles";




const projectnoteSchema=new Schema({
    project:{
        type:Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    content:{
        type:String,
        required:true,
    }

    
},{
    timestamps:true
})


export const Projectnote=mongoose.model("projectnote",projectnoteSchema)
