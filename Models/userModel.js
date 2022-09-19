import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required: true
    },
    lastname:String,
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    mobile:Number,
    isAdmin: {
        type:Boolean,
        default: false
    },
    isMember: {
        type:Boolean,
        default: false
    }
    
    
},
    {  timestamps : true}
);

const UserModel = new mongoose.model("user", userSchema);

export default UserModel;