import User from "../models/user.js"
import bcrypt from 'bcrypt'
import dbConnection from "../db/db.js"

const register=async()=>{
    try{
        // const hashPassword=await bcrypt.hash("admin", 10);
        // const newUser=new User({
        //     name: "admin",
        //     email:"admin@gmail.com",
        //     password: hashPassword,
        //     role: "admin"
        // });
        // newUser.save();
    }
    catch(er){
        console.log("some error", er);
    }
}

// register();
export default register;