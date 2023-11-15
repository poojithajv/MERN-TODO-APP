const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {UserModel,validate1,validate2} = require("../models/UserModel");
const registerUser = asyncHandler(async (req, res) => {
    try{
        // Generate a custom ID
        console.log(req.body)
        const {error}=validate1(req.body)
        if (error){
            return res.status(400).send({message:error.details[0].message})
        }
        const user=await UserModel.findOne({email:req.body.email})
        if (user){
            return res.status(409).send({message:"User with given email already exists"})
        }
        const salt=await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword=await bcrypt.hash(req.body.password,salt)
        await new UserModel({...req.body,password:hashPassword}).save()
        return res.status(201).send({message:"User Created Successfully"})
        
    }catch(error){
        return res.status(500).send({message:'Internal Server Error'})
    }
});

// login a user
const loginUser = asyncHandler(async (req, res) => {
    try{
        const {email,password}=req.body
        const {error}=validate2(req.body)
        if (error){
            return res.status(400).send({message:error.details[0].message})
        }
        const user=await UserModel.findOne({email})
        if (!user){
            return res.status(401).send({message:"Invalid Email "})
        }
        const validPassword=await bcrypt.compare(password,user.password)
        if (!validPassword){
            return res.status(401).send({message:"Invalid Password"})
        }
        const token=jwt.sign({
            user: {
                userName: user.userName,
                email: user.email,
                id: user.id,
            },
            },process.env.JWTSECRETKEY,{expiresIn:"7d"})
        res.status(200).send({accessToken:token,userName:user.userName,userId:user.userId,message:"Logged in successfully"})
        return
    }catch(error){
        res.status(500).send({message:'Internal Server Error'})
        return
    }
});
module.exports={registerUser,loginUser}