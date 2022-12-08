import React, { useState, useEffect, useRef } from 'react'
import messageIcon from "../Images/messageIcon.png"
import flyIcon from "../Images/flyIcon.png"
import veeIcon from "../Images/vee.png"
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from './Carousel/Carousel';
import { Avatar } from '@mui/material';
import Picker from "emoji-picker-react";
import { useSelector } from 'react-redux';
import { deepOrange } from '@mui/material/colors';
import { selectUserById } from '../UserSlice/UsersSlice';
import { parseISO, formatDistanceToNow } from 'date-fns';
import { SelectCurrentUser } from '../Profile/UserRedux';
import { BsFillHeartFill, BsHeart, BsEmojiSmile } from "react-icons/bs";
import { toast, ToastContainer } from 'react-toastify';
import styled from "styled-components";
import { useGetPostQuery } from "../../PostSlice/index"

const TimeAgo = ({ Time }) => {
    let timeAgo = ""
    if (Time) {
        const date = parseISO(Time);
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
        if (timeAgo.substring(0, 5) == "about") {
            timeAgo = timeAgo.substring(5)
        }
        if (timeAgo == "less than a minute ago") {
            timeAgo = "just now"
        }
    }
    return (<span style={{ fontSize: "13px" }}>
        &nbsp; <>{timeAgo}</>

    </span>)
}

const toastifyOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    // theme:"dark"
}
const SinglePost = ({ post }) => {
    const userpost = useSelector(state => selectUserById(state, post.Userid));
    const { refetch } = useGetPostQuery()
    const CurrentUser = useSelector(SelectCurrentUser)
    let { Caption, ImageUpload, Likes, Location, Time, Userid, Username, comment } = post
    const [textLeng, settextLeng] = useState(true)
    const [comment1, setcomment1] = useState("")
    const [showEmoji, setShowEmoji] = useState(false)
    const [alreadyLike, setalreadyLike] = useState(false)
    const [changeIcon, setChangeIcon] = useState(false)
    const [peoples, setPeoples] = useState([...Likes.people])
    const [number, setNumber] = useState(Likes.NumberOfLike)
    const Inputref = useRef()
    const host = "http://localhost:4000/user/";


    const tell = () => {
        if (comment1.length > 0) {
            settextLeng(false)
            return
        }
        settextLeng(true)
    }
    const HandleEmojiClick = (event, emoji) => {
        setcomment1(prev => prev += emoji.emoji)
        setShowEmoji(false)

    }
    const love = async () => {
        setChangeIcon(true)
        axios.post(`${host}like`, { postId: post._id, UserId: CurrentUser._id }).then(async (res) => {
            if (res.data.status) {
                await refetch()
                setPeoples(prev => [...prev, CurrentUser._id])
                setalreadyLike(true)
                setNumber(prev => prev += 1)

            } else {
                toast.error(`Fail to like this ${userpost.Username}`, toastifyOptions)
                setChangeIcon(false)
            }
        }).catch(err => {
            if (err) {
                toast.error(err.message, toastifyOptions)
            }
        })

    }


    const HandleClickComment = async () => {
        try {
            settextLeng(true)
            let data = {
                postId: post._id, comment: {
                    userId: CurrentUser._id,
                    Message: comment1,
                    reply: [],
                    time: new Date().toISOString()
                }
            }
            setcomment1("")
            await axios.post(`${host}comment`, data).then(res => {
                if (res.data.status) {
                    toast.success(`You have successfuly comment to ${userpost.Username} posts `, toastifyOptions)
                } else {
                    toast.error(`Fail to comment to ${userpost.Username} posts `, toastifyOptions)
                }
            }).catch(err => {
                if (err) {
                    toast.error(err.message, toastifyOptions)
                }
            })
        } catch (err) {
            if (err) {
                toast.error(err.message, toastifyOptions)
            }
        } finally {
            settextLeng(false)
        }
    }
    const PickerComponent = () => {
        return (
            <div id="PickerComponent">
                <Picker onEmojiClick={HandleEmojiClick} />
            </div>
        )
    }

    useEffect(() => {
        if (showEmoji) {
            Inputref.current.scrollIntoView({ behaviour: "smoth" })
        }

    }, [showEmoji])

    useEffect(() => {
        const canChange = [alreadyLike, peoples.includes(CurrentUser._id)].every(Boolean)
        if (canChange) {
            setChangeIcon(true)
        }

    }, [alreadyLike]);
    useEffect(() => {

        if (peoples.includes(CurrentUser._id)) {
            setChangeIcon(true)
        }

    }, [])

    return (
        <Container>
            <div className=' commonChildren  border  rounded  py-2' >
                <div className='d-flex mb-1 ps-2' style={{ justifyContent: "space-between" }}>
                    <div className='d-flex ' style={{ justifyContent: "space-between" }}>
                        <div className='rounded-circle ' style={{ height: "40px", width: "40px" }}>
                            <Avatar sx={{ bgcolor: deepOrange[500], }} src={userpost && userpost?.ProfilePic} className="rounded-circle h-100 w-100"></Avatar>
                        </div>
                        <Link to={post.Userid == CurrentUser._id ? "/user/profile" : `/user/about/${post.Userid}`} className='mt-1 ms-2 text-dark text-decoration-none' style={{ fontSize: "14px" }}>{userpost && userpost?.Username}</Link >
                    </div>
                    <button className='btn' data-bs-toggle="modal" data-bs-target="#exampleModal44">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                        </svg>
                    </button>
                </div>
                <Link to={`/user/Post/${post.id}`} className="LinkSImage"  >
                    {ImageUpload.length <= 1 ?
                        ImageUpload.map((value, index) => (
                            (<div key={index}>
                                <img src={value.image} width="100%" alt={value.image} className='' height="400px" />
                            </div>
                            )
                        )) : (
                            <Carousel data={ImageUpload} />
                        )
                    }
                </Link>
                <div className='d-flex mx-1' style={{ justifyContent: "space-between" }}>
                    <div>
                        {changeIcon ? <button className='btn' > <BsFillHeartFill className='LoveSvg' />  </button> :
                            <button className='btn' onClick={() => love()}> <BsHeart className='LoveSvg' />  </button>
                        }
                        <button className='btn'><img src={messageIcon} alt="finest" /></button>
                        <button className='btn'><img src={flyIcon} alt="goodddddd" /></button>
                    </div>
                    <div>
                        <button className='btn'><img src={veeIcon} alt="goahsdhsj" /></button>
                    </div>
                </div>
                <div className='mx-1' style={{ fontSize: "14px" }}>
                    <p>{number} likes</p>
                </div>

                <div className='d-flex'>
                    <Link to={post.Userid == CurrentUser._id ? "/user/profile" : `/user/about/${post.Userid}`} className='text-dark text-decoration-none mx-1'><b>{userpost && userpost?.Fullname} </b></Link>
                    <p>{Caption}</p>
                </div>
                <div className='mx-1'>
                    <p className='text-muted cursor-pointer' style={{ cursor: "pointer", fontSize: "14px" }}>View all comment</p>
                </div>
                <div className='mx-1'>
                    <p className='text-muted '>
                        <TimeAgo Time={Time} />
                    </p>
                </div>
                <div className='d-flex border   border-top w-100'>
                    <button className='btn' onClick={() => setShowEmoji(!showEmoji)}><BsEmojiSmile className='EmojiShowerEmoji' /></button>{
                        showEmoji ?
                            <div><PickerComponent /></div> : ""
                    }
                    <input type="text" ref={Inputref} className="form-control border border-0" onKeyPress={tell} value={comment1} onChange={(e) => setcomment1(e.target.value)} />
                    <button className='btn text-info ' onClick={HandleClickComment} disabled={textLeng}>Post</button>
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
            <ToastContainer />
        </Container>
    )
}
export default SinglePost

const Container = styled.section`
-webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
box-shadow:2px 4px 10px 1px rgba(201,201,201,0.47) ;
height:700px;
margin-bottom:10px;

`