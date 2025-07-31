import mongoose from 'mongoose'

const attendanceSchema=new mongoose.Schema({
    empID: {type: mongoose.Types.ObjectId, ref: "Employee", required: true},
    date: {type : String, default: new Date(Date.now()).toLocaleDateString()},
    status : {type : String, enum: ["Present", "Absent", "Late", "Leave"], default: null }
})

const Attendance= mongoose.model("Attendance", attendanceSchema );

export default Attendance;