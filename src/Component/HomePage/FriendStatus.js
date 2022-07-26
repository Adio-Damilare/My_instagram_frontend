import React from 'react'
import avatar from "../Images/images.png"

function FriendStatus() {
  return (
    <button className='btn rounded-circle  mx-1' style={{width:"80px",height:"80px"}}> 
           <div  className='h-100 w-100' style={{margin:"0 0px"}}>
            <div className='border rounded-circle border-danger border-3' style={{height:"60px",width:"60px"}}>
                <img src={avatar} className="rounded-circle border border-3 w-100 h-100" />
            </div>
            <p style={{fontSize:"10px"}}>Oluwadamilare</p>
    </div>
    </button>

  )
}

export default FriendStatus