import User from "../models/user.js"
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'
import Employee from "../models/employee.js";

const storage= multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+path.extname(file.originalname));
    }
});

export const upload=multer({storage: storage});

export const addEmployee=async (req, res)=>{
    try{
        const {name, email, password, role, dob, gender, salary, maritalStatus, employeeID, designation, department
        }=req.body
        
        const user= await User.findOne({email});
        if(user){
            return res.status(400).json({success: false, error: "user allready exist with this email."});
        }

        const employee= await User.findOne({employeeID});
        if(employee){
            return res.status(400).json({success: false, error: "employeeID allready exist."});
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

        const newEmployee=new Employee({
            userId:savedUser._id,
            employeeID,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        });
        await newEmployee.save();

        return res.status(202).json({success: true, message: "employee added successfully."});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success: false, error: "server error from addEmployee"});
    }
}

export const getEmployees=async (req, res)=>{
    try{
        const employees= await Employee.find().populate('userId', {password: 0}).populate('department');
        // if(!records){
        //     return res.status(404).json({success: false, error: "Employee record not found"});

        // }

        return res.status(200).json({success: true, message: "record fetched", employees});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false, error: "get Employee server error"});
    }
}

export const getSingleEmployee= async(req, res)=>{
    try{
        const {id}=req.params
        if(!id){
            return res.status(401).json({success: false, error: "Invalid request."});
        }
        
        let employee= await Employee.findById(id).populate('userId', {password: 0}).populate('department');
        if(!employee){
            employee= await Employee.findOne({userId: id}).populate('userId', {password: 0}).populate('department');
        
        }

        return res.status(200).json({success: true, message: "record fetched", employee});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false, error: "get Employee server error"});
    }
}

export const editEmployee= async(req, res)=>{
    try{
        const {id}=req.params
        if(!id){
            return res.status(401).json({success: false, error: "Invalid request."});
        }
        
        const {name, salary, maritalStatus, designation, department}=req.body
        
        const employee= await Employee.findById(id);
        if(!employee){
            return res.status(404).json({success: false, error: "Employee Not found!"});
        }

        const user= await User.findById(employee.userId);
        if(!user){
            return res.status(404).json({success: false, error: "User Not found!"});
        }

        const updateUser=await User.findByIdAndUpdate(employee.userId, {name});
        
        const updateEmployee=await Employee.findByIdAndUpdate(id, {maritalStatus, designation, salary, department});
        
        if(!updateUser || !updateEmployee){
            return res.status(400).json({success: false, error: "Not Updated."});
        }
        console.log("updated");
        return res.status(202).json({success: true, message: "Updated", employee});
    }
    catch(error){
        return res.status(500).json({success: false, error: "Employee server error"});
    }
}

export const departmentEmployees= async(req, res)=>{
    try{
        const {id}=req.params
        if(!id){
            return res.status(401).json({success: false, error: "Invalid request."});
        }
        
        let employee= await Employee.find({department: id});
        if(!employee || employee.length <1){
            employee=await Employee.findOne({userId: id});
            if(!employee)
                return res.status(404).json({success: false, error: "Employee Not found!"});
        }
        
        return res.status(200).json({success: true, employee});
    }
    catch(error){
        return res.status(500).json({success: false, error: "Employee server error"});
    }
}

