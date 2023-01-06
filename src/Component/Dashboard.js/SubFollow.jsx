import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { Avatar } from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import { SelectCurrentUser ,Following} from '../Profile/UserRedux';
import { useSelector,useDispatch } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';
const toastifyOptions={
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
}
const SubFollow = ({ user }) => {
    const currentUser =useSelector(SelectCurrentUser);
    const [foll, setFoll]=React.useState(true);
    const dispatch=useDispatch();
    const url = "https://instagram-server-side-gau760amz-adio-damilare.vercel.app/user/follow";
    const follow = () => {
        setFoll(false)
        axios.post(url,{currentUserId:currentUser._id,userToFollow:user._id}).then(res=>{
            if(res.data.status){
                toast.success(`you are following ${user.Username}`,toastifyOptions);
                dispatch(Following(user._id));
            }else{
                setFoll(true);
                toast.error(`Fail to follow ${user.Username}`,toastifyOptions);
            }
        })
    }
    return (
        <div className='d-flex border my-2'   style={{justifyContent:"space-between",height:"50px"}}>
            <div className='d-flex h-100'>
                <big className='rounded-pill border ' style={{ height: "100%", width: "45px" }}>
                    <Link to={`/user/about/${user._id}`} className="h-100 w-100">
                        <Avatar sx={{ bgcolor: deepOrange[500] }} src={user.ProfilePic} className="h-100 w-100"></Avatar>
                    </Link>
                </big>
                <div className='ps-2 pt-1'>
                    <Link to={`/user/about/${user._id}`} className="h-100 w-100 text-decoration-none"  >
                        <p style={{ fontSize: "13px" }} className=" cursor-pointer " id="mackBook">{user.Fullname}</p>
                        <p style={{ fontSize: "11px", margin: "-20px 0" }} className="text-muted" >{user.Username}</p>
                    </Link>
                </div>
            </div>
            <div className=' h-100 d-flex ' style={{ justifyContent: "center", alignItems: "center", paddingRight: "10px" }} >
               { foll? <button className={"btn btn-light d-flex align-items-center border border-primary"} style={{ height: "60%", fontSize: "12px" }} onClick={follow}> follow</button>:
                 <button className={"btn btn-primary d-flex align-items-center border border-primary"} style={{ height: "60%", fontSize: "12px" }} disabled >following</button>}
            </div>
            <ToastContainer/>
        </div>
    )
}

export default SubFollow