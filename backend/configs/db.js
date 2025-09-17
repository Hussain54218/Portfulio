import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const mongorul=process.env.MONGO_URI
const connectDB=async()=>{
    try{
      const conn= await mongoose.connect(mongorul);
      console.log("connect secussfully")
    }
    catch{
        console.log("dos not connect to DB")
    }
}
export default connectDB