import axios from 'axios'
import React,{useState} from 'react'
import avatar from "../Images/download1.png"
import { Avatar } from '@mui/material' 
import { deepOrange } from '@mui/material/colors' 
import {useSelector} from "react-redux"
import { SelectCurrentUser } from '../Profile/UserRedux'

const DescriptSwitch=()=> {
  const current=useSelector(SelectCurrentUser)
  
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