const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
 const token=req.header('x-auth-token');
 if(!token) return res.status(401).json({msg:"No token"});
 try{
  req.user=jwt.verify(token,"secret");
  next();
 }catch{
  res.status(401).json({msg:"Invalid"});
 }
};
