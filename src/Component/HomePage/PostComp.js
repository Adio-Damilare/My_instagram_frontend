import React,{useState,useEffect} from 'react'
import iframe from "../Images/download1.png"
import loveIcon from "../Images/loveIcon.png"
import messageIcon from "../Images/messageIcon.png"
import flyIcon from "../Images/flyIcon.png"
import veeIcon from "../Images/vee.png"
import iconRep from "../Images/iconRep.png"
import { Link } from 'react-router-dom'
import axios from 'axios'
import Carousel from './Carousel/Carousel'
import { Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
// import { Carousel } from 'bootstrap'

const PostComp = ({val, index}) => {
    const URI="http://localhost:4000/user/findoneuser"
    useEffect(() => {
        getUser()
    })
    const [userpost, setuserpost] = useState({})
    let {Caption,ImageUpload,Likes,Location,imeStamp,Userid,Username,comment}=val
    const getUser=()=>{
        let data={id:Userid}
        axios.post(URI,data).then((res)=>{
            setuserpost(res.data.user)
        }).then((error)=>{
            if(error){
                console.log(error)
            }
        })
    }
    const [textLeng, settextLeng] = useState(true)
    const [comment1, setcomment1] = useState("")
    const tell=()=>{
        if(comment1.length>0){
            settextLeng(false)
            return
        }
        settextLeng(true)
    }
    console.log(userpost)
    return (
        <>
            <div className=' border  rounded mb-3 pt-2' key={index}>
                <div className='d-flex mb-1 ps-2' style={{ justifyContent: "space-between" }}>
                    <div className='d-flex ' style={{ justifyContent: "space-between" }}>
                        <div className='rounded-circle ' style={{ height: "40px", width: "40px" }}>
                        <Avatar sx={{ bgcolor: deepOrange[500],}} src={userpost.ProfilePic}  className="rounded-circle h-100 w-100"></Avatar>
                        </div>
                        <p className='mt-1 ms-2' style={{fontSize:"14px"}}>{userpost.Username}</p>
                    </div>
                    <button className='btn' data-bs-toggle="modal" data-bs-target="#exampleModal44">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                        </svg>
                    </button>
                </div>
                <div style={{ width: "100%" }} >
                    { ImageUpload.length<=1?
                        ImageUpload.map((value,index)=>( 
                           ( <div key={index}>
                                <img src={value.image} width="100%" className='' height="400px" />
                            </div>
                            )
                           
                        )):(
                            <Carousel data={ImageUpload} />
                        )
                    }

                    
                </div>
                <div className='d-flex ' style={{ justifyContent: "space-between" }}>
                    <div>
                        <button className='btn'><img src={loveIcon} /></button>
                        <button className='btn'><img src={messageIcon} /></button>
                        <button className='btn'><img src={flyIcon} /></button>
                    </div>
                    <div>
                        <button className='btn'><img src={veeIcon} /></button>
                    </div>
                </div>
                <div>
                    <p>34 likes</p>
                </div>
                <div className='d-flex'>
                    <Link to="" className='text-dark text-decoration-none'><b>Adio </b></Link>
                    <p>Description of the post</p>
                </div>
                <div>
                    <p className='text-muted cursor-pointer' style={{ cursor: "pointer" }}>View all 23 comment</p>
                </div>
                <div>
                    <p className='text-muted '>2 days ago</p>
                </div>
                <div className='d-flex border  border-top w-100'>
                    <button className='btn'><img src={iconRep} /></button>
                    <input type="text" className="form-control border border-0" onKeyPress={tell} onChange={(e)=>setcomment1(e.target.value)} />
                    <button className='btn text-info ' disabled={textLeng}>Post</button>
                </div>
            </div>
            <div className="modal fade" id="exampleModal44" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content w-100" style={{ borderRadius: "20px" }} >
                        <div className="modal-body d-flex" style={{ flexDirection: "column", borderRadius: "20px " }}>
                            <button className='btn text-danger border border-bottom w-100 py-2'>Report</button>
                            <button className='btn text-danger  border-bottom w-100'>Unfollow</button>
                            <button className='btn  border-bottom w-100'>Go to post</button>
                            <button className='btn text-muted  border-bottom w-100'>Share to</button>
                            <button className='btn text-muted  border-bottom w-100'>Copy link</button>
                            <button className='btn text-muted  border-bottom w-100'>Embed</button>
                            <button className='btn text-muted  border-bottom w-100' data-bs-dismiss="modal" aria-label="Close">cancel</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default PostComp