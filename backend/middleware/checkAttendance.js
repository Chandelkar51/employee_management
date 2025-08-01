import Attendance from "../models/attendance.js"
import Employee from "../models/employee.js"

const checkAttendance= async(req, res, next)=>{
    try{
        const date=`${new Date(Date.now()).getDate()}/${new Date(Date.now()).getMonth()+1}/${new Date(Date.now()).getFullYear()}`;
        
        const exist=await Attendance.findOne({date});
        if(!exist){
            const employees=await Employee.find();
            const attendance=employees.map(emp=>
                ({'empID': emp._id, 'date': date})
            )

            await Attendance.insertMany(attendance);
        }
        next();
    }
    catch(error){
        // console.log('Attendance middleware :'+error)
        res.status(500).json({success: false, error: error.message})
    }
}

export default checkAttendance;
