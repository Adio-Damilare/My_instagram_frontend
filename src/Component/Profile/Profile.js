import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../Dashboard.js/NavBar'
import avatar2 from "../Images/setting pic.png"
import axios from 'axios';
import styled from 'styled-components'
import { useSelector ,useDispatch} from 'react-redux';
import { SelectCurrentUser,ChangeProfilePic } from './UserRedux'
import { selectPostById } from '../../PostSlice'
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import {toast ,ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const Main=styled.div`
position:relative;
top:90px;
.containerfather{ 
    width:100%;
    .container{
        width:100%;
        overflow-x:scroll;
        display:flex;
        justify-content:space-between;
        .children{
            margin: 20px;
            max-height:220px;
            img{
                height:100%;
            }
        }
        &::-webkit-scrollbar{
            display:none;
        }
    }
}

`

const toastifyOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    // theme:"dark"
}

const Post=({id})=>{
    const Mypost=useSelector(state=>selectPostById(state,id))
    return(
        <div className='children'>
            <img src={Mypost&&Mypost?.ImageUpload[0]?.image} alt={Mypost && Mypost?.id}/>
        </div>
    )
}
const Profile = () => {
    const userInfo=useSelector(SelectCurrentUser);
    const dispatch=useDispatch()
    const URI = "https://instagram-server-side-gau760amz-adio-damilare.vercel.app/user/uploadimage"
    const deviceId = userInfo._id
    const [file, setfile] = useState("")
    const [profile, setProfile] = useState("")
    const [change, setChange] = useState(false)
    useEffect(() => {
        if (change) {
           dispatch(ChangeProfilePic(profile))
        }

    }, [change])

      const {Friends,Follow,post}=userInfo;
    useEffect(() => {
        if (file !== "") {
            showFace()
        }

    }, [file])

    const changImage = (e) => {
        const imageonBoard = (e.target.files[0])
        const reader = new FileReader()
        reader.readAsDataURL(imageonBoard)
        reader.onload = () => {
            setfile(reader.result)
        }
    }
    const showFace = () => {
        const data = { id: deviceId, file }
        axios.post(URI, data).then((res) => {
            if(res.data.status){
                setProfile(res.data.ProfilePic)
                setChange(true)
                toast.success("Upload successfuly",toastifyOptions)
            }else{
                toast.error("upload fail",toastifyOptions)

            }
        }).catch((err) => {
            if (err) {
                toast.error(err.message,toastifyOptions)
            }
        })
    }
    return (
        <>
                  <>
                        <NavBar />
                        <div className='container-fluid mt-3 rounded'>
                            <div className='row'>
                                <div className='col-lg-8 col-md-12 mx-auto border rounded-1 row pt-3'>
                                    <div className='   col-md-5 col-lg-3 col-sm-5 me-lg-5 ps-lg-5' id='picCol' style={{ height: "" }}>
                                        <div className='btn' id="stubornImage" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" >
                                            <Avatar   sx={{ bgcolor: deepOrange[500], }}  src={userInfo.ProfilePic} className=' w-100  h-100 rounded-circle  border border-2'  />
                                        </div>
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-sm-6  ms-lg-2' id='labelCol'>
                                        <div className='d-flex pt-3  ' id='descendantOfLabel' style={{ justifyContent: "space-evenly" }}>
                                            <p style={{ fontSize: "27px", fontWeight: "lighter" }} className="text-muted">{userInfo&&userInfo.Username}</p>
                                            <Link to="" className='btn  border' id='LabelColEditButton' style={{ height: "40px" }}>Edit profile</Link>
                                            <img src={avatar2} style={{ height: "36px", marginTop: "3px" }} data-bs-toggle="modal" alt="avatar" data-bs-target="#staticBackdrop144" className=" btn" />
                                        </div>
                                        <div className='d-flex' id='postFollow' style={{ justifyContent: "space-between", padding: "6 70px 0 10px" }}>
                                            <div>{post.length} Posts</div>
                                            <div>{Follow.length} Followers</div>
                                            <div>{Friends.length} Following</div>
                                        </div>
                                        <div className='mt-3 ms-2' id='Ouwadamilare222'>
                                            <p style={{ fontSize: "17px" }}>{userInfo&&userInfo?.Fullname}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <Main >
                            <hr/>
                            <div>Posts</div>
                            <div className='containerfather'>
                            <div className='container'>
                                {
                                    post.map((p,index)=>(
                                        <Post id={p} key={index}/>
                                    ))
                                }
                            </div>
                            </div>
                            </Main>
                        </div>
                        <div className="modal fade" id="staticBackdrop144" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog  scrollable" style={{ marginTop: "6pc", }}>
                                <div className="modal-content text-center pt-2" style={{ borderRadius: "30px", width: "80%", marginLeft: "40px" }}>
                                    <Link to="" className='text-decoration-none text-dark text-muted pb-1 btn' style={{ fontSize: "13px" }}>Change Password</Link>
                                    <hr style={{ marginTop: "0px" }} />
                                    <Link to="" className='text-decoration-none text-dark text-muted pb-1 btn' style={{ fontSize: "13px" }}>QR Code</Link>
                                    <hr style={{ marginTop: "0px" }} />
                                    <Link to="" className='text-decoration-none text-dark text-muted pb-1 btn' style={{ fontSize: "13px" }}>Apps and websites</Link>
                                    <hr style={{ marginTop: "0px" }} />
                                    <Link to="" className='text-decoration-none text-dark text-muted pb-1 btn' style={{ fontSize: "13px" }}>Notification</Link>
                                    <hr style={{ marginTop: "0px" }} />
                                    <Link to="" className='text-decoration-none text-dark text-muted pb-1 btn' style={{ fontSize: "13px" }}>Privacy and security</Link>
                                    <hr style={{ marginTop: "0px" }} />
                                    <Link to="" className='text-decoration-none text-dark text-muted pb-1 btn' style={{ fontSize: "13px" }}>Login activity</Link>
                                    <hr style={{ marginTop: "0px" }} />
                                    <Link to="" className='text-decoration-none text-dark text-muted pb-1 btn' style={{ fontSize: "13px" }}>Emails from istagram</Link>
                                    <hr style={{ marginTop: "0px" }} />
                                    <Link to="" className='text-decoration-none text-dark text-muted pb-1 btn' style={{ fontSize: "13px" }}>Report a problem</Link>
                                    <hr style={{ marginTop: "0px" }} />
                                    <Link to="" className='text-decoration-none text-dark text-muted pb-1 btn' style={{ fontSize: "13px" }}>Embed</Link>
                                    <hr style={{ marginTop: "0px" }} />
                                    <Link to="" className='text-decoration-none text-dark text-muted pb-1 btn' style={{ fontSize: "13px" }}>Log out</Link>
                                    <hr style={{ marginTop: "0px" }} />
                                    <Link to="" data-bs-dismiss="modal" aria-label="Close" className='text-decoration-none text-dark text-muted  btn' style={{ fontSize: "13px" }}>cancel</Link>


                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog  scrollable modal-dialog-centered " >
                                <div className="modal-content text-center py-4 " style={{ borderRadius: "10px", width: "80%", marginLeft: "40px" }}>
                                    <strong>Change Profile Photo</strong>
                                    <div className='my-1' data-bs-dismiss="modal" aria-label="Close">
                                        <label htmlFor="file" className="custom-file-upload btn">
                                            Upload Photo
                                        </label>
                                        <input type="file" onChange={(e) => changImage(e)} id="file" accept='image/*' />
                                    </div>
                                    <button className='btn text-danger fsw-bold'>Remove Current Photo</button>
                                    <button className='btn' data-bs-dismiss="modal" aria-label="Close">Cancel</button>


                                </div>
                            </div>
                        </div>
                    </>
        </>
    )
}

export default Profile