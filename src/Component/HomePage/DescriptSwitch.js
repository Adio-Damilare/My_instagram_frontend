import axios from 'axios'
import React,{useState} from 'react'
import avatar from "../Images/download1.png"
import { Avatar } from '@mui/material' 
import { deepOrange } from '@mui/material/colors' 

function DescriptSwitch() {
  const URI="http://localhost:4000/user/findoneuser"
  let id=JSON.parse(localStorage.deviceId)
 let data={id}
 const [current, setcurrent] = useState({})
  axios.post(URI,data).then((res)=>{
    if(res.data.status){
      setcurrent(res.data.user)
    }
  }).then((error)=>{
    if(error){
      console.log(error)
    }
  })
  return (
    <div className=''>
        <div className='d-flex mt-3' style={{justifyContent:"space-between"}}>
            <div className='d-flex'>
                <div className='rounded-circle border' style={{height:"60px",width:"60px"}}>

                <Avatar sx={{ bgcolor: deepOrange[500],  }} className="h-100 w-100" src={current.ProfilePic} ></Avatar>
                </div>
                <div className='' style={{paddingLeft:"15px"}}>
                    <strong style={{fontSize:"14px"}}>{current.Fullname}</strong>
                    <p style={{fontSize:"11px"}}>{current.Username}</p>
                </div>
            </div>
            <div><button className='btn text-primary' style={{fontSize:"12px"}}>Switch</button></div>
        </div>

    </div>
  )
}

export default DescriptSwitch