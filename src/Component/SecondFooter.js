import React from 'react'
import appStore from "./Images/appStore.png"
import googlePlay from "./Images/googlePlay.png"
import {Link} from "react-router-dom"

function SecondFooter(props) {
    return (
        <>
            <div className='col-lg-4 col-md-6 col-sm-7 mx-auto' >
            <div className='mt-2 border card  mt-4'>
                <p style={{ fontSize: "13px", textAlign: "center", marginTop: "20px" }}>{props.para} <Link to={props.link}  className='text-primary text-decoration-none'> {props.hrefTag} </Link></p>
            </div>
            <div className='mt-3 '>
                <p className='text-center' style={{ fontSize: "14px" }}>Get the app.</p>
                <div className=' ps-2 text-center'>
                    <button className='btn'><img src={appStore} /></button>
                    <button className='btn'><img src={googlePlay} /></button>
                </div>
            </div>
        </div>
    </>
  )
}

export default SecondFooter