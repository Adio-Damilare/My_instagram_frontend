import React from 'react'
import logos1 from "../Images/200w.gif" 

function LoadingGif() {
  return (
    <div className='container-fluid  h-100 w-100' >
        <div className='d-flex justify-content-center  h-100 align-items-center'>
            <img src={logos1} alt="isloadingif"  className='w-100 h-100'/>
        </div>
    </div>
  )
}

export default LoadingGif