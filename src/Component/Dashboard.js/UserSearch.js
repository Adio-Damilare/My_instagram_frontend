import React from 'react'
import { Link } from 'react-router-dom'
import avatar from "../Images/avatar2.png"

function UserSearch({name,ProfilePic,Username,id}) {
  return (
    <div>
        <Link to={`about/${id}`} className='border text-decoration-none' style={{cursor:"pointer",display:"flex",alignItems:"center"}}>
            <div>
            <div style={{height:"60px"}} className="border border-3 rounded-circle">
                <img src={ProfilePic} className="w-100 h-100 rounded-circle" alt="findprole"/>
            </div>
            </div>
            <div className='ps-3'>
                <strong className='text-decoration-none text-dark'>{Username}</strong>
                <p className='text-decoration-none text-muted'>{name}</p>
            </div>
        </Link>
    </div>
  )
}

export default UserSearch