import express from 'express'
import connectDb from './config/db.js'

import dotEnv from 'dotenv'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import { notFound , errorHandler} from './middleware/errorMiddleware.js'

dotEnv.config()
const app = express()

connectDb()



console.log(process.env.MONGO_URI)

const PORT = process.env.PORT || 5000


app.get('/', (req,res)=>{
    res.send("Api is running...")
})
app.use('/api/products',productRoutes)
//not found error
app.use(notFound)
// server error
app.use(errorHandler)





app.listen(PORT, ()=>{
 console.log( `Server listening in ${process.env.NODE_ENV} mode on Port ${PORT}`.magenta.bold)  
})