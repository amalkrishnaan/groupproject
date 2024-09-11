import mongoose from "mongoose"
export default async function connection(){
    const db=await mongoose.connect("mongodb://127.0.0.1:27017/BATCH_11:30");
    return db
}