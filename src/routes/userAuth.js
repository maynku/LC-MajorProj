const express=require('express');
const authRouter=express.Router();
const {register,login,logout,getProfile}=require('../controllers/userAuth');


authRouter.post('/register',register );
authRouter.post('/login',login);
authRouter.get('/logout',logout);
authRouter.get('/getProfile',getProfile);

module.exports=authRouter;
