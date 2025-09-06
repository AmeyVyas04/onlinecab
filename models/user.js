import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        "area":{
            type:String,
            required:true
        },
        "city":{
            type:String,
            required:true
        },
        "state":{
            type:String,
            required:true
        }
    }

})
const User=mongoose.models.User || mongoose.model("User",userSchema);
export default User;