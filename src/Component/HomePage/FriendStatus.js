import React from 'react'
import {selectUserById} from "../UserSlice/UsersSlice";
import {useSelector} from "react-redux";
import { Avatar } from "@mui/material"
import {deepOrange} from "@mui/material/colors"

function FriendStatus({user}) { 
  const user1=useSelector((state)=>selectUserById(state,user))
  return (
    <button className='btn rounded-circle  mx-1' style={{width:"80px",height:"80px"}}> 
           <div  className='h-100 w-100' style={{margin:"0 0px"}}>
            <div className='border rounded-circle border-danger border-3' style={{height:"60px",width:"60px"}}>
                {/* <img src={user1&&user1.ProfilePic} className="rounded-circle border border-3 w-100 h-100" /> */}
                <Avatar sx={{ bgcolor: deepOrange[500] }} className="rounded-circle border border-3 w-100 h-100"  src={user1&&user1.ProfilePic}  ></Avatar>
            </div>
            <p style={{fontSize:"10px"}}>{user1&&user1?.Username}</p>
    </div>
    </button>

  )
}

export default FriendStatus