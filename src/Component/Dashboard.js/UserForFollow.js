import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import user from "../Images/avatar2.png"
import axios from 'axios'
import { Avatar } from "@mui/material"
import { deepOrange } from "@mui/material/colors"

function UserForFollow(props) {
    const inputRef = useRef()
    const [ideal, setideal] = React.useState("")
    const { Username, Fullname, id } = props
    const follow = () => {
        const userId = (inputRef.current.value)
    }
    return (
        <>
            <div className=' d-flex ' style={{ height: "45px", justifyContent: "space-between" }}>
                <div className='d-flex h-100'>
                    <big className='rounded-pill border ' style={{ height: "100%", width: "45px" }}>
                        <Link to={`about/${id}`} className="h-100 w-100">
                            <Avatar sx={{ bgcolor: deepOrange[500] }} className="h-100 w-100"></Avatar>
                        </Link>
                    </big>
                    <div className='ps-2 pt-1'>
                        <p style={{ fontSize: "13px" }} className=" cursor-pointer" id="mackBook">{Username ? Username : "oluwadamilare"}</p>
                        <p style={{ fontSize: "11px", margin: "-20px 0" }} className="text-muted" >{Fullname ? Fullname : "Popular"}</p>

                    </div>
                </div>
                <div className=' h-100 d-flex ' style={{ justifyContent: "center", alignItems: "center", paddingRight: "10px" }} >
                    <input type="hidden" ref={inputRef} value={id} />
                    <button className='btn btn-primary ' style={{ height: "60%", fontSize: "12px" }} onClick={follow}>Follow</button>
                </div>
            </div>
        </>
    )
}

export default UserForFollow