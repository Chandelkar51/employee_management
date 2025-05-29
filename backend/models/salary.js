import mongoose, { Schema } from "mongoose";

const salaarySchema=new Schema({
    employeeID: {type: Schema.Types.ObjectId,ref:"Employee", required: true},
    basicSalary: {type: Number, required: true},
    allowance: {type: Number, },
    deduction: {type: Number},
    netSalary: {type: Number},
    payDate: {type: Date, required: true},
    createdAt: {type: Date, default: Date.now()},
    updaedAt: {type: Date, default: Date.now()},
});
const Salary=mongoose.model("Salary", salaarySchema);

export default Salary;
