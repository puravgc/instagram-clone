const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();
const { Jwt_secret } = require("../keys");
const mongoose = require('mongoose')
const User = mongoose.model('User')


module.exports = (req,res,next)=>{
  const {authorization} = req.headers
  if(!authorization){
    return res.status(401).json({error:'You must be signed in'})
  }
  const token = authorization.replace("Bearer ","")
  jwt.verify(token,Jwt_secret,(err,payload)=>{
    if(err){
      return res.status(401).json({error:'You must be signed in'})
    }

    const {_id} = payload
    User.findById(_id).then((userData)=>{
      req.user = userData
      next()
    })
  })
 
}