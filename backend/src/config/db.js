import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        
        console.log("mongodb connected successfully");

    } catch(error){
        console.error("error connecting to MONGODB", error);
        process.exit(1);
    }
};