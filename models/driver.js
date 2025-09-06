import mongoose from "mongoose";


const driverSchema=new mongoose.Schema({
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
    license:{
        type:String,
        required:true
    },
    car:{
        type:String,
        required:true
    },
    address:{
        "city":{
            type:String,
            required:true
        },
        "state":{
            type:String,
            required:true
        },
        
    }
})
const Driver=mongoose.models.Driver || mongoose.model("Driver",driverSchema);
export default Driver;