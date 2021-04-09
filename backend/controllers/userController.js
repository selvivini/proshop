import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'



//Auth user and get token
//@route post('/api/users/login)
//@acess public route
const authUser =  asyncHandler(async(req,res)=>{
   const {email,password} = req.body

   const user = await User.findOne({email})

   if(user && (await user.matchPassword(password))){
     res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id)
     })
   }else{res.status(401)
   throw new Error('ivalid email or password')
}
})

//register a new user
//@route post'/api/users
//@acess public route
const registerUser =  asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
 
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('user already exists')
    }
    const user =await User.create({name, email, password})
    if(user){
        res.status(201).json({id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)})
    }else{
        res.status(400)
        throw new Error('invalid user data')
    }
 })
 

//get user profile
//@route get('/api/users/profile)
//@acess private route
const getUserProfile =  asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if(user){
  res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
  })
    }else{
        res.status(401)
        throw new Error('user not found')
    }
 })
 


export {authUser, getUserProfile, registerUser}