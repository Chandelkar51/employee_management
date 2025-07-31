import { useEffect, useState } from 'react';
import axios from 'axios';
import {useAuth} from '../context/auth.context.jsx'
import { toast } from 'react-toastify';
import {UserCheck } from 'lucide-react';

export const ShowAttendance = () => {
  const [attendence, setAttendances] = useState([]);
  const {user} = useAuth();
  const [loading, setIsloading] = useState(false);

  function isUserPresent(month, day){
    var status="false";
    attendence.find(user => {
      let date = (user.date).split("/");
      if(date[0].length == 1){
        date[0] = '0' + date[0];
      }
      if(date[1].length == 1){
        date[1] = '0' + date[1];
      }
      date = date.reverse().join("-");
      const dd = new Date(date);

      if(dd.getMonth() == month && dd.getDate() == day){ //check for user status on this date
        status= user.status;
      }
    });
    return status;
  }


  useEffect(()=>{
    const featch=async()=>{
      try{
        setIsloading(true);
        const response=await axios.get(import.meta.env.VITE_HOST+`/api/attendance/${user._id}`,
          {
            headers :{'Authorization' : `Bearer ${localStorage.getItem("token")}`}
          })
      
        if(response.data.success){
          setAttendances(response.data.userAttendance);
        }
    }
      catch(error){
        // console.log(error)
        toast.error(error.message)
      }finally{
        setIsloading(false);
      }
    }
    featch();
  },[])

  const month=[31,28,31,30,31,30,31,31,30,31,30,31];
  const monthName=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  
  return (
    <div className="p-6 mx-2">
      <h2 > 
        <UserCheck className='text-teal-800 inline mb-2'/>
        <span className="text-xl font-semibold  ">Attendance</span>
        <span className='text-8 font-medium'>
          <select name="year" className='border rounded-[2px] w-22 h-6 ml-10 pb-1' defaultValue="2025" >
            <option value="">Year</option>
            <option value="2025">2025</option>
          </select>
        </span>
      </h2>
      {loading && <p> Loading</p>}
      {!loading && <div className="flex justify-between max-w-6xl ml-2">
        {month.map((days, index)=>{
          return <div key={index}>
            <h2 className="px-4">{monthName[index]}</h2>
            <div className="grid grid-cols-7 grid-rows-5 gap-0.5 p-2 max-w-[100px]">      
              {Array.from({length : days}).map((_, i) =>{  
                return <div key={i} className={`${isUserPresent(index, i+1)=="Present" ?  "bg-green-700": isUserPresent(index, i+1)=="Absent"? "bg-red-600" : isUserPresent(index, i+1)=="Leave"? "bg-amber-300" : isUserPresent(index, i+1)=="Late"? "bg-green-400" : "bg-gray-300"} w-2.5 h-3 rounded-[2px]`}></div>
              })}
            </div>
          </div>
        })}
      </div>}
    </div>
  )
}
