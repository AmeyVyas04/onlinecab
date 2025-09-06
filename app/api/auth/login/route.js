import Connect from "@/app/DBConnect"
import User from "@/models/user"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const POST=async(req)=>{
    await Connect()
    try {
        const {email,password}=await req.json()
        if(!email || !password){
            return new Response(JSON.stringify({error:"Please fill all the fields"}),{status:400})

        }
        const existinguser=await User.findOne({email})
        if(!existinguser){
            return new Response(JSON.stringify({error:"User does not exist"}),{status:400})
        }
        // comapring the password
        const ispasswordcorrect=await bcrypt.compare(password,existinguser.password)
        if(!ispasswordcorrect){
            return new Response(JSON.stringify({error:"Invalid credentials"}),{status:400})
        }
        // creating a cookies
        const token=jwt.sign({userId:existinguser._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        const response=new Response(JSON.stringify({message:"Login successful"}),{status:200})
        response.headers.set("Set-Cookie",`usertoken=${token}; HttpOnly; Path=/; Max-Age=86400`)
        return response
    } catch (error) {
        console.error("Login error:", error)
        return new Response(JSON.stringify({error:"Internal server error"}),{status:500})
    }
}