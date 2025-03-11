import express, { json } from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import 'dotenv/config'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)
app.get('/' ,(req,res)=>{
  res.send("Api working")
})
app.listen(PORT,()=>{
    connectDB()
    console.log(`server is running on port no:${PORT}`)
})