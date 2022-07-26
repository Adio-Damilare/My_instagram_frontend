import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../Dashboard.js/NavBar'
import avatar from "../Images/avatar2.png"
import avatar2 from "../Images/setting pic.png"
import axios from 'axios';

const Profile = () => {
    const URI = "http://localhost:4000/user/uploadimage"
    const URI1 = "http://localhost:4000/user/findoneuser"
    const deviceId = JSON.parse(localStorage.deviceId)
    const [file, setfile] = useState("")
    const [profile, setProfile] = useState("")
    const [userInfo,setUserInfo]=useState({})
    const [change,setChange]=useState(false)

    const getProfilePage=()=>{
        const data = { id:deviceId}
        axios.post(URI1,data).then((res)=>{
            setUserInfo(res.data.user)
        }).then((error)=>{
            if(error){
                console.log(error)
             }
        })
    }
        useEffect(() => {

            if(change){
                window.location.reload(false);
            }

        }, [change])
        
    useEffect(() => {
     getProfilePage()
    }, [])
    
    useEffect(() => {
        if (file !== "") {
            showFace()
        }

    },[file])

    const changImage = (e) => {

        const imageonBoard = (e.target.files[0])
        const reader = new FileReader()
        reader.readAsDataURL(imageonBoard)
        reader.onload = () => {
            setfile(reader.result)
        }
    }
    const showFace = () => {
        const data = { id:deviceId,file}
        axios.post(URI, data).then((res) => {
            setChange(true)
        }).catch((err) => {
            if (err) {
                console.log(err)
            }
        })
    }
    return (
        <><NavBar/>

            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-8 col-md-12 mx-auto border row pt-3'>
                        <div className='   col-md-5 col-lg-3 col-sm-5 me-lg-5 ps-lg-5' id='picCol' style={{ height: "" }}>
                            <div className='btn' id="stubornImage" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" >

                                <img className=' w-100  h-100 rounded-circle  border border-2'src={userInfo.ProfilePic}  alt="profilepic"/>
                            </div>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-6  ms-lg-2' id='labelCol'>
                            <div className='d-flex pt-3  ' id='descendantOfLabel' style={{ justifyContent: "space-evenly" }}>
                                <p style={{ fontSize: "27px", fontWeight: "lighter" }} className="text-muted">0luwadamilare2245</p>
                                <Link to="" className='btn  border' id='LabelColEditButton' style={{ height: "40px" }}>Edit profile</Link>
                                <img src={avatar2} style={{ height: "36px", marginTop: "3px" }} data-bs-toggle="modal" alt="avatar" data-bs-target="#staticBackdrop144" className=" btn" />
                            </div>
                            <div className='d-flex' id='postFollow' style={{ justifyContent: "space-between", padding: "6 70px 0 10px" }}>
                                <div>0 Posts</div>
                                <div>2 Followers</div>
                                <div>23 Following</div>
                            </div>
                            <div className='mt-3 ms-2' id='Ouwadamilare222'>
                                <p style={{ fontSize: "17px" }}>Oluwadamilare</p>
                            </div>
                        </div>
                    </div>

                </div>
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
                        <div className='my-1'  data-bs-dismiss="modal" aria-label="Close">
                            <label htmlFor="file"  className="custom-file-upload btn">
                                Upload Photo
                            </label>
                            <input type="file" onChange={(e)=>changImage(e)} id="file" />
                        </div>
                        <button className='btn text-danger fsw-bold'>Remove Current Photo</button>
                        <button className='btn' data-bs-dismiss="modal" aria-label="Close">Cancel</button>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile