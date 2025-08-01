import Attendance from "../models/attendance.js";

export const getDetails = async(req, res) => {
  try {
    const date=`${new Date(Date.now()).getDate()}/${new Date(Date.now()).getMonth()+1}/${new Date(Date.now()).getFullYear()}`;
    
    const attendance=await Attendance.find({date: date}).populate({
        path : "empID",
        populate :[ 
            {
                path : "department",
                select : "dep_name"
            },
            {
                path : "userId",
                select : "name"
            },
        ]
    });
    if(!attendance)
        return res.status(404).json({success: false, error: "Data not fetched!"});

    return res.status(200).json({success: true, message: "Fetched reports", attendance});
  } catch (error) {
    // console.log(error)
    return res.status(500).json({success: false, error: error.message});
  }
}

export const markAttendance=async(req, res)=>{
    try{
        const {ID, status}=req.body;
    
        if(!ID){
            return res.status(404).json({success: false, error:"empID required"});
        }
        else if(!status || (status!="Present" && status!="Absent" && status!="Late" && status!="Leave"))
            return res.status(406).json({success: false, error: "Wrong status"});
        
        const newAttendance=await Attendance.findByIdAndUpdate(ID, {$set : {status:status}}, {new: true});
        
        return res.status(200).json({success: true, message:"done", newAttendance});
    }
    catch(error){
        // console.log(error);
        return res.status(500).json({success: false, error: error.message});
    }
}

export const attendanceReport = async(req, res) => {
  try {
    const attendance=await Attendance.find().populate({
        path : "empID",
        populate :[ 
            {
                path : "department",
                select : "dep_name"
            },
            {
                path : "userId",
                select : "name"
            },
        ]
    });
    if(!attendance)
        return res.status(404).json({success: false, error: "Data not fetched!"});

    return res.status(200).json({success: true, message: "Fetched reports", attendance});
  } catch (error) {
    // console.log(error)
    return res.status(500).json({success: false, error: error.message});
  }
}

export const showAttendance = async(req, res) => {
  try {
    const {id}=req.params
    if(!id)
        return res.status(401).json({success:false, error: "UserId is undefined !"});

    const attendances = await Attendance.find().populate('empID');
    if(!attendances)
        return res.status(404).json({success: false, error: "Data not fetched try again!"});
    
    const userAttendance = attendances.filter(att => att.empID?.userId?._id.equals(id));
    if(!userAttendance)
        return res.status(404).json({success: false, error: "Data not fetched try again!"});

    return res.status(200).json({success: true, message: "Fetched reports", userAttendance});
  } catch (error) {
    // console.log(error)
    return res.status(500).json({success: false, error: error.message});
  }
}
