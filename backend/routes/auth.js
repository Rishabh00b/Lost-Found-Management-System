const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/User');
const router=express.Router();

router.post('/register',async(req,res)=>{
 const {name,email,password}=req.body;
 let u=await User.findOne({email});
 if(u) return res.status(400).json({msg:"Email exists"});
 const hash=await bcrypt.hash(password,10);
 await new User({name,email,password:hash}).save();
 res.json({msg:"Registered"});
});

router.post('/login',async(req,res)=>{
 const {email,password}=req.body;
 const u=await User.findOne({email});
 if(!u) return res.status(400).json({msg:"Invalid"});
 const ok=await bcrypt.compare(password,u.password);
 if(!ok) return res.status(400).json({msg:"Invalid"});
 const token=jwt.sign({id:u._id},"secret");
 res.json({token});
});

module.exports=router;
