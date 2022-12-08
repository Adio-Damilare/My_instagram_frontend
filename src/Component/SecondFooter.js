import React from 'react'
import {Link} from "react-router-dom"

function SecondFooter(props) {
    return (
        <>
            <div className='col-lg-4 col-md-6 col-sm-10 mx-auto' >
            <div className='mt-2 border card  mt-4'>
                <p style={{ fontSize: "13px", textAlign: "center", marginTop: "20px" }}>{props.para} <Link to={props.link}  className='text-primary text-decoration-none'> {props.hrefTag} </Link></p>
            </div>
        </div>
    </>
  )
}

export default SecondFooter