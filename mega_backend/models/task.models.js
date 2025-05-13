import mongoose from "mongoose";
import {AvailableTasksStatus,TaskStatusEnum} from "../utils/constants.js"




const taskSchema=new Schema({
    title:{
        type:String,
        required:true,
        trime:true,

    },
    description:{
        type:String,
        required:true,

    },
    project:{
        type:Schema.Types.ObjectId,
        ref:"Project",
        required:true

    },
    assignedTo:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    assignedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:AvailableTasksStatus,
        default:TaskStatusEnum.TODO
    }
    ,
    attachments:{
        type:[
            {
                url:String,
                mimetype:String,
                size:Number,
                
            }
        ]
    }


},{timestamps:true})


export const Task=mongoose.model("projecttask",taskSchema)
