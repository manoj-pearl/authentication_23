import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb is connected::");
        return connection
    } catch (error) {
        console.log("MongoDb is not connected")
    }
}