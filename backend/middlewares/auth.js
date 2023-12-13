import jwt from "jsonwebtoken"
import User from "../models/user.js"

export const authMiddleware = async(req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        res.json({success:false,message:"Please Login or Register"})
    }
    const token = authorization.split(" ")[1]
    try {
        const {_id} = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findOne({_id:_id}).select({_id})
        next()
    } catch (error) {
        res.status(400).json({success:false,message:"Request is not Authorized"})
    }

  
}