import mongoose from "mongoose";
import { AvailableUserRoles,UserRolesEnum } from '../utils/constants.js'


const projectmemberSchema=new Schema({
    user:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
    project:{
        type:Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },
    role:{
        type:String,
        enum:AvailableUserRoles,
        default:UserRolesEnum.MEMBER

    }

},{timestamps:true})


export const Projectmember=mongoose.model("projectprojectmember",projectmemberSchema)
