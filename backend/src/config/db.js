import mongoose from "mongoose";
export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.Mongo_URI)
        console.log("MongoDB connected successfully");
    }catch(error){
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process with failure
    }
}