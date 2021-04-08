import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'




//Auth user and get token
//@route post('/api/users/login)
//@acess public route
const authUser =  asyncHandler(async(req,res)=>{
   const {email,password} = req.body

   const user = await User.findOne({email})

   if(user && (await user.matchPassword(password))){
     res.json({
         _id: (await user)._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: null
     })
   }else{res.status(401)
   throw new Error('ivalid email or password')
}
})


export {authUser}