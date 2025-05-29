import Salary from '../models/salary.js'
import Employee from '../models/employee.js'

export const salary= async(req, res)=>{
    try{
        const {basicSalary, allowance, deduction, employeeID, payDate}=req.body;

        const totalSalary= parseInt(basicSalary) + parseInt(allowance) - parseInt(deduction);

        const newSalary= new Salary({
            employeeID,
            basicSalary,
            allowance,
            deduction,
            netSalary: totalSalary,
            payDate
        });

        await newSalary.save();

        return res.status(200).json({success: true, newSalary});
    }
    catch(error){
        return res.status(500).json({success: false, error: "Salary server error."});
    }
}

export const getSalary= async(req, res)=>{
    try{
        const {id}=req.params
        if(!id){
            return res.status(401).json({success: false, error: "invalide Id"});
        }
        
        let salaries=await Salary.find({employeeID: id}).populate('employeeID');
        
        if(!salaries || salaries.length < 1){
            const employee= await Employee.findOne({userId: id});
            if(employee)
                salaries= await Salary.find({employeeID: employee._id}).populate('employeeID');
            
            if(!salaries)
                return res.status(404).json({success: false, error: "can`t get salary, try again!"});
            
        }
        return res.status(200).json({success: true, salaries});
        
    }
    catch(error){
        return res.status(500).json({success: false, error: "Get salary server error"});
    }
}
