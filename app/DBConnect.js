import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const Connect=async()=>{
    if(mongoose.connections[0].readyState){
        console.log("Already connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {
          
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

export default Connect;
