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

        //create and send token 
        const token=jwt.sign({_id:user._id, emailId:emailId},process.env.SECRET_KEY,{expiresIn:60*60})
        res.cookie("token",token,{maxage:60*60*1000}) //mili 
        //sec second m hota hai 

        res.status(201).json({ message: "User registered successfully" });


    } catch (err) {
        res.status(400).json({ message: "Error "+err });
    }
}

const login=async(req,res)=>{
    try {
        const {emailId,password}=req.body;
       
        if(!emailId || !password){
           throw new Error("emailId and password are required");
        }

        //search for user in database
        const user=await User.findOne({emailId:emailId});
        const match= becrypt.compare(req.body.password,user.password);// old +current password
        if(!match){
            throw new Error("invalid password");
        }
         //create and send token 
        const token=jwt.sign({_id:user._id, emailId:emailId},process.env.SECRET_KEY,{expiresIn:60*60})
        res.cookie("token",token,{maxage:60*60*1000}) //mili 
        //sec second m hota hai 
        res.status(200).json({ message: "User logged in successfully" });

    } catch (err) {
        res.status(400).json({ message: "Error "+err });
    }
}

const logout=(req,res)=>{
    try {
        
    } catch (error) {
        res.status(400).json({ message: "Error "+err });     
    }
    
    
}