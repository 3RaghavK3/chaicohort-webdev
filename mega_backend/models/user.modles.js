import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'


const userSchema=new Schema({
    avatar:{
        type:{
            url:String,
            localpath:String
        },
        default:{
            url:'https://placehold.co/600x400',
            localpath:""
        }
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true,
    },
    email:{
         type: String,
        required: true,              
        unique: true,

    },
    fullname:{
         type: String,
        required: true,              
        unique: true,

    }
    ,password:{
         type: String,
        required: true,              
        unique: true,
        minlength:6,
    },
    isemailverified:{
        type:Boolean,
        default:false
    },
    forgotpasswordtoken:{
        type:String,

    },
     forgotpasswordexpiry:{
        type:Date
    },
    refreshtoken:{
        type:String
    },
    emailverificationtoken:{
        type:String
    },
    emailverificationexpiry:{
        type:Date
    },
    emailtoken:{
        type:string
    }

},{timestamps:true})


userSchema.pre("save",async function(next){
    if(!this.isModified('password')) return next();
    else this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPassword=async function (password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateacesstoken=()=>{
    return jwt.sign({_id:this._id,email:this.email,username:this.username},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPRIY
        }
    )
}

userSchema.methods.generaterefreshtoken=()=>{
    return jwt.sign({_id:this._id,email:this.email,username:this.username},
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPRIY
        }
    )
}

userSchema.methods.generateTemporaryToken=()=>{

    const unhashedtoken=crypto.randomBytes(32).toString('hex')
    this.emailtoken=crypto.createHash("sha256").update(unhashedtoken).digest('hex')
    const tokenexpiry=Date.now()+(20*60*1000)

   

    
    // if(!this.isemailverified) return crypto.randomBytes(32).toString('hex')
}


export const User=mongoose.model("projectuser",userSchema)
