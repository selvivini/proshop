import express from 'express'
import connectDb from './config/db.js'

import dotEnv from 'dotenv'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound , errorHandler} from './middleware/errorMiddleware.js'
import orderRoutes from './routes/orderRoutes.js'
dotEnv.config()
const app = express()

connectDb()





const PORT = process.env.PORT || 5000


app.get('/', (req,res)=>{
    res.send("Api is running...")
})
// get paypal details
app.get('/api/config/paypal',(req, res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use(express.json())
app.use('/api/products',productRoutes)

app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
//not found error
app.use(notFound)
// server error
app.use(errorHandler)





app.listen(PORT, ()=>{
 console.log( `Server listening in ${process.env.NODE_ENV} mode on Port ${PORT}`.magenta.bold)  
})