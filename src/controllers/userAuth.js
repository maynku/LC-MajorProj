//const path = require('path');
//require('dotenv').config({ path: path.join(__dirname, '..', '.env') });


const User=require('../models/User');
const validator=require('../utils/validator');
const becrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const register =async(req,res)=>{
    try {
        //validate the data 
        validator(req.body);

        // Your registration logic here
        const {firstName,emailId,password}=req.body;   

        //hash the password 
        req.body.password=await becrypt.hash(password,10);
        const user=await User.create(req.body)

        console.log('Creating JWT token...');
        console.log('Token payload:', {_id:user._id, emailId:emailId});
        console.log('JWT_SECRET_KEY for JWT:', process.env.JWT_SECRET_KEY);
        console.log('Type of JWT_SECRET_KEY:', typeof process.env.JWT_SECRET_KEY);
        
        if(!process.env.JWT_SECRET_KEY){
            throw new Error('JWT_SECRET_KEY is undefined at token creation');
        }
        
        //create and send token 
        const token=jwt.sign({_id:user._id, emailId:emailId},process.env.JWT_SECRET_KEY,{expiresIn:60*60})
        res.cookie("token",token,{maxage:60*60*1000}) //mili 
        //sec second m hota hai 

        res.status(201).json({ message: "User registered successfully" });


    } catch (err) {
        res.status(400).json({ message: "Error "+err });
    }
}

const login=async(req,res)=>{
    console.log('LOGIN FUNCTION CALLED!');
    try {
        console.log('=== LOGIN DEBUG START ===');
        console.log('SECRET_KEY in controller:', process.env.JWT_SECRET_KEY);
        console.log('Request body:', req.body);
        const {emailId,password}=req.body;
        console.log('Extracted emailId:', emailId);
        console.log('Extracted password:', password);

        if(!emailId || !password){
           throw new Error("emailId and password are required");
        }

        //search for user in database
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("user not found");
        }
        const match= becrypt.compare(req.body.password,user.password);// old +current password
        if(!match){
            throw new Error("invalid password");
        }
         //create and send token 

        const token=jwt.sign({_id:user._id, emailId:emailId},process.env.JWT_SECRET_KEY,{expiresIn:60*60})
        res.cookie("token",token,{maxage:60*60*1000}) //mili 
        //sec second m hota hai 
        
        res.status(200).json({ message: "User logged in successfully" });

    } catch (err) {
        res.status(400).json({ message: "Error "+err });
    }
}

const logout=(req,res)=>{
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error "+err });     
    }
}

const getProfile=async(req,res)=>{
    try {
        const user=await User.findById(req.user._id);
        res.status(200).json({ message: "User profile fetched successfully",data:user });
    } catch (error) {
        res.status(400).json({ message: "Error "+err });     
    }
}

module.exports={register,login,logout,getProfile};