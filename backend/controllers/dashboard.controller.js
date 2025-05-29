import Employee from '../models/employee.js'
import Department from '../models/department.js'
import Leave from '../models/leave.js'

export const getSummary= async(req, res)=>{
    try{
        const totalEmployee=await Employee.countDocuments();

        const totalDepartment=await Department.countDocuments();

        const totalSalary=await Employee.aggregate([
            {$group: {_id: null, salary: {$sum: "$salary"}}}
        ]);

        const leaves=await Leave.distinct("employeeID");
        const leaveStatus=await Leave.aggregate([
            {$group: {
                _id: "$status",
                count: {$sum: 1}
            }}
        ]);
        
        const leaveSummary={
            applied: leaves.length,
            pending: leaveStatus.find(item =>item._id ==="Pending")?.count || 0,
            approved: leaveStatus.find(item =>item._id ==="Approved")?.count || 0,
            rejected: leaveStatus.find(item =>item._id ==="Rejected")?.count || 0,
        }

        return res.status(200).json({success: true, totalDepartment, totalEmployee, totalSalary, leaveSummary});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success: false, error: "Dashboard server error"});
    }
}