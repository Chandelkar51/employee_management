import Department from "../models/department.js";

export const addDepartment=async (req, res)=>{
    try{
        const {dep_name, description}=req.body;
        if(!dep_name || !description)
            return res.status(401).json({success: false, error: "Fields required!"});
        const newDepartment=new Department({
            dep_name, 
            description
        })
        if(!newDepartment)
            return res.status(402).json({success: false, error: "Department not created, try again."});

        await newDepartment.save();
        return res.status(200).json({success: true, Department: newDepartment});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success: false, error:'department server error'});
    }
}

export const getDepartment=async (req, res)=>{
    try{
        const departments=await Department.find();
        return res.status(202).json({success: true, departments});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success: false, error: error});
    }
}

export const editDepartment= async (req, res)=>{
    try{
        const {id}=req.params
        if(!id)
            return res.status(401).json({success: false, error: "ID not provided!"});
        
        const department= await Department.findById(id);
        if(!department)
            return res.status(402).json({success: false, error: "Anable to find"});
        
        return res.status(202).json({success: true, department});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success: true, error: "Department server error"});
    }
}

export const updateDepartment=async (req, res)=>{
    try{
        const{id}=req.params;
        const details=req.body;
        const department=await Department.findByIdAndUpdate(id, details, {new: true});

        return res.status(202).json({success: true, message: `Department ${department.dep_name} is deleted`});    
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success: false, error: "department server error"});
    }
}

export const deleteDepartment=async (req, res)=>{
    try{
        const{id}=req.params;
        const department=await Department.findById(id);

        await department.deleteOne(); // this deleteOne execute in pre middleware 
        
        return res.status(202).json({success: true, department});   
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success: false, error: "department Delete server error"});
    }
}
