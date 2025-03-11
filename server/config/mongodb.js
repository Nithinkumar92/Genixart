import mangoose from 'mongoose'

const connectDB = async ()=>{

    mangoose.connection.on('connected',()=>{
        console.log("Database connected successfully")
    })

    await mangoose.connect(`${process.env.MONGODB_URI}/Genixart`)
}

export default connectDB;
