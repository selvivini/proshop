import mongoose from 'mongoose'
import dotEnv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDb from './config/db.js'

dotEnv.config()

connectDb()

const importData = async()=>{
 try {
     //make sure the database fields are empty
   await Order.deleteMany()  
   await Product.deleteMany()
   await User.deleteMany()
  const createdUsers= await User.insertMany(users)
  const adminUser = createdUsers[0]._id

  //sample products that are in product.js are stored in variable sampleProducts
  const sampleProducts = products.map(product=>{
      return{...product, user:adminUser}
  })
   await Product.insertMany(sampleProducts)
   console.log('Data imported!'.green.inverse)
   process.exit
 } catch (error) {
     console.error(`${error}`.red.inverse)
     process.exit(1)
 }
}
// delete records
const destroyData = async()=>{
    try {
        //make sure the database fields are empty
      await Order.deleteMany()  
      await Product.deleteMany()
      await User.deleteMany()
     console.log('Data destroyed!'.red.inverse)
      process.exit
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
   }

   if(process.argv[2] === '-d'){
       destroyData()
   }else{
       importData()
   }

