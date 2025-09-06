import dotenv from "dotenv"
import Connect from "@/app/DBConnect"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "@/models/user"
dotenv.config()

export const POST=async(req)=>{
    await Connect()
    try {
        const {name,email,password,phone,address}=await req.json();
        if(!name || !email || !password || !phone || !address){
            return new Response(JSON.stringify({error:"Please fill all the fields"}),{status:400})
        }
        const existinguser=await User.findOne({email})
        if(existinguser){
            return new Response(JSON.stringify({error:"User already exists"}),{status:400})
        }
        // hashing the password
        const hashedpassward=await bcrypt.hash(password,10)

        const newuser=new User({
            name,
            email,
            password:hashedpassward,
            phone,
            address
        })
        await newuser.save()

        // creating a cookies
        const token=jwt.sign({userId:newuser._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        const response=new Response(JSON.stringify({message:"User created successfully"}),{status:201})
        response.headers.set("Set-Cookie",`usertoken=${token}; HttpOnly; Path=/; Max-Age=86400`)
        return response
        
    } catch (error) {
        return new Response(JSON.stringify({error:"Internal Server Error"}),{status:500})
    }
}