import path from 'path';
import Leave from '../models/leave.js'

export const NewLeave= async(req, res)=>{
    try{
        const {employeeID, leaveType, startDate, endDate, reason}=req.body;

        const addLeave= new Leave({
            employeeID,
            leaveType,
            startDate,
            endDate,
            reason,
        });

        await addLeave.save();

        return res.status(200).json({success: true, addLeave});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success: false, error: "Leave server error."});
    }
}

export const getLeaves= async(req, res)=>{
    try{
        const {id}=req.params

        if(!id){
            return res.status(401).json({success: false, error: "invalide Id"});
        }

        let leave=await Leave.findById(id).populate({
            path: 'employeeID',
            populate: [
                {
                    path: 'department',
                    select: "dep_name"
                },
                {
                    path: 'userId',
                    // select: "name"
                }
            ]
        });
        
        if(!leave || leave.length <1){
            leave=await Leave.find({employeeID: id}).populate('employeeID');
            
            if(!leave)
                return res.status(404).json({success: false, error: "can`t get leaves data, try again!"});
        }
        
        return res.status(200).json({success: true, leave});
    }
    catch(error){
        return res.status(500).json({success: false, error: "server error"});
    }
}

export const fetchLeaves= async(req, res)=>{
    try{
        const leaves=await Leave.find().populate({
            path: 'employeeID',
            populate: [
                {
                    path: 'department',
                    select: "dep_name"
                },
                {
                    path: 'userId',
                    select: "name"
                }
            ]
        }).lean();
        
        if(!leaves){
            return res.status(404).json({success: false, error: "can`t get leaves data, try again!"});
        }
        return res.status(200).json({success: true, leaves});
        
    }
    catch(error){
        return res.status(500).json({success: false, error: "Leave server error"});
    }
}

export const changeStatus= async(req, res)=>{
    try{
        const {id}=req.params
        const {status}=req.body
        // console.log(status)
        if(!id){
            return res.status(401).json({success: false, error: "invalide Id"});
        }
        if(!status){
            return res.status(401).json({success: false, error: "Undefine Status"});
        }
        
        let leaves=await Leave.findOne();
        
        if(!leaves){
            return res.status(404).json({success: false, error: "Not found, try again!"});
        }

        leaves=await Leave.findByIdAndUpdate(id, {status: status})
        
        return res.status(200).json({success: true, leaves});
        
    }
    catch(error){
        return res.status(500).json({success: false, error: "Leave server error"});
    }
}
