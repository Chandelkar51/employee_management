import mongoose, { Schema } from 'mongoose'
import Employee from './employee.js'
import Leave from './leave.js'
import Salary from './salary.js'

const departmentSchema=new Schema({
    dep_name: {type: String, required: true},
    description: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

departmentSchema.pre("deleteOne",{document: true, query: false}, async function(next){
    try{
        const employees = await Employee.find({department: this._id});
        const empIds= employees.map(emp=>emp._id);
        
        await Employee.deleteMany({department: this._id});
        await Leave.deleteMany({employeeID: {$in: empIds}});
        await Salary.deleteMany({employeeID: {$in: empIds}});

        next()
    }
    catch(error){
            next(error);
    }
});

const Department=mongoose.model("Department", departmentSchema);
export default Department;