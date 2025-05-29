import mongoose from "mongoose";
import register from "../init/dbInit.js"

const dbConnection=async()=>{
    try{
        await mongoose.connect(`${process.env.CLUSTER_URL}`);
        console.log("Database connected")
    }
    catch(err){
        console.log("DB Error", err);
    }
}
// register();
export default dbConnection;