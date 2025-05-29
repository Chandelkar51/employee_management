import User from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from "multer";

export const login=async(req, res)=>{
    try{
        const {email, password}=req.body;
        if(!email || !password)
            return res.status(401).json({success: false, error: "Field required!"});

        const user= await User.findOne({email});
        if(!user){
           return res.status(404).json({success:false, error: "User Not Found"});
        }
        else{
            const isMatch=await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(401).json({success: false, error: "Wrong Password"});
            }

            const token=jwt.sign({_id: user._id, role: user.role},
                process.env.JWT_KEY, {expiresIn: "7d"}
            );
            
            if(!token)
                return res.status(402).json({success: false, error: "Token not created."});

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // set to true if using HTTPS
                sameSite: "strict", // or "lax" depending on your case
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
              });
              
            res.status(200)
                .json({success: true,
                    token,
                    user: {_id: user._id, name: user.name, role: user.role}
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ success: false, error: "Login Server Error" });
    }
}

const storage= multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+path.extname(file.originalname));
    }
});

export const upload=multer({storage: storage});

export const registration=async (req, res)=>{
    try{
        const {name, email, password, role}=req.body
        
        if(!password){
            return res.status(401).json({success: false, error: "Password required!"})
        }
        
        const user= await User.findOne({email});
        if(user){
            return res.status(400).json({success: false, error: "user allready exist with this email."});
        }
        
        const hashPass=await bcrypt.hash(password, 10);
        
        const newUser=new User({
            name,
            email,
            password: hashPass,
            role,
            profileImage: req.file? req.file.filename : ""
            
        });

        const savedUser= await newUser.save();

        return res.status(202).json({success: true, message: "employee added successfully."});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success: false, error: "server error from registration"});
    }
}

export const forgetPassword= async(req, res)=>{
    try{
        const {email, newPassword }=req.body;
        
        const user=await User.findOne({email: email});
        if(!user){
            return res.status(404).json({success: false, error: "User not found!"});
        }
        
        // const isMatch=await bcrypt.compare(oldPassword, user.password);
        // if(! isMatch){
        //     return res.status(404).json({success: false, error: "Old password not matched!"});
        // }
        const hashPassword=await bcrypt.hash(newPassword, 10);
        const newUser= await User.findByIdAndUpdate(user._id, {password: hashPassword});

        return res.status(200).json({success: true, message: "Password Updated"});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success: false, error: "Forget Password sever error."});
    }
}