import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
    
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: 'Role must be either "user" or "admin"'
        },
        default: 'user'
    },
    verificationToken: {
        type: String
    },
    verificationTokenExpiry: {
        type: Date
    }
}, {
    timestamps: true
});

    userSchema.pre('save', async function(next) {
        if (this.isModified('password')) {  
            try {
                this.password = await bcrypt.hash(this.password, 10); 
                next();  
            } catch (err) {
                next(err);  
            }
        } else {
            next(); 
    }});

userSchema.methods.comparePassword = async function(password) {
    try {
        const match = await bcrypt.compare(password, this.password); 
        return match; 
    } catch (err) {
        throw new Error('Error comparing password');
    }
};


userSchema.methods.generateJWT=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:"10m"})
    
}
    

const User = mongoose.model('User', userSchema);






export default User;
