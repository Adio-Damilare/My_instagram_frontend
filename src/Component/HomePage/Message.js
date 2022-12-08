import React, { useRef, useEffect, useState } from 'react'
import NavBar from '../Dashboard.js/NavBar'
import { useSelector, useDispatch } from 'react-redux';
import { SelectCurrentUser } from '../Profile/UserRedux';
import styled from 'styled-components';
import { selectUserById } from '../UserSlice/UsersSlice';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { SelectCurrentFriend, AddFriend, Selectsocket, Selectmessages, Sendmsg, SetMessage } from './Messge.redux';
import { IoMdSend } from "react-icons/io";
import axios from 'axios';
import Picker from "emoji-picker-react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';
import { formatDistanceToNow, parseISO } from 'date-fns';
import {BsEmojiSmile} from "react-icons/bs";
const toastifyOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
}

const SingleMesageUser = ({ id }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(SelectCurrentUser)
    const host = "http://localhost:4000/message";
    const user = useSelector(state => selectUserById(state, id))
    const Getallmessages = () => {
        dispatch(AddFriend(id))
        axios.post(host, { from: currentUser._id, to: id }).then(res => {
            if (res.data.status) {
                dispatch(SetMessage(res.data.data))
            } else {
                toast.error("Fail to get the messages due to connection errors", toastifyOptions)
            }
        })
    }
    return (
        <Main className='border' onClick={Getallmessages} >
            <div className='father border rounded-pill'>
                <Avatar sx={{ bgcolor: deepOrange[500] }} className='img' src={user && user?.ProfilePic} />
            </div>
            <article>
                {user && user?.Username.length > 10 ? `.${user?.Username.substring(0, 10)}...` : user?.Username}
            </article>
        </Main>
    )
    

}
const Main = styled.div`
margin:10px 0px;
display:flex;
align-items:center;
gap:10px;
height:100%;
cursor:pointer;
.father{
    height:64px;
    width:60px;
    .img{
        height:100%;
        width:100%;
        border-raduis:20px;
    }
    article{
        font-size:12px
    }
}

@media screen and (max-width:750px) and (min-width:70px) {
    flex-direction:column;
    min-width:150px;
    border-radius:5px;
    gap:5px;
    .father{
        height:54px;
        width:50px;
        .img{
            height:100%;
            width:100%;
            border-raduis:20px;
        }
        article{
            font-size:10px
        }
    }
}
`

const MessageContainer = () => {
    const friendId = useSelector(SelectCurrentFriend)
    const friend = useSelector(state => selectUserById(state, friendId))
    const messages = useSelector(Selectmessages)
    const containerRef = useRef()

    useEffect(() => {
        messages && messages?.length > 0 && containerRef.current.scrollIntoView({ behaviour: "smoth" })
    })


    const Timago = ({ time }) => {
        let timeAgo = ""
        if (time) {
            const date = parseISO(time);
            const timePeriod = formatDistanceToNow(date)
            timeAgo = `${timePeriod} ago`
            if (timeAgo.substring(0, 5) == "about") {
                timeAgo = timeAgo.substring(5)
            }
            if (timeAgo == "less than a minute ago") {
                timeAgo = "just now"
            }
        }
        return (<span style={{ fontSize: "10px" }}>
            &nbsp; <>{timeAgo}</>

        </span>)
    }
    return (<>{friend ? <>
        <Section>
            <div >
                <div className=' spaStack border   px-3 py-2 mt-1' style={{ gap: "10px" }}>
                    <Avatar className='img' sx={{ bgcolor: deepOrange[500] }} src={friend && friend.ProfilePic} />
                    <article> {friend && friend.Username}</article>
                </div>
                <div className='coverpage'  >
                    {
                        messages && messages.map((msg) => {
                            // console.log(msg)e

                            return (
                                <div ref={containerRef} className={` singlemessage  `} style={msg.fromSelf ? { textAlign: "end", } : { textAlign: "start" }}>
                                    <span>{msg.message}</span>
                                    <span><Timago time={msg?.time} /></span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Section>
    </> :
        <div className='h-100 d-flex justify-content-center align-items-center ' style={{ minHeight: "73.5vh" }}>
            Please select  a friend to chat with
        </div>}
    </>
    )
}
const Section = styled.section`
min-height:70vh;
div{
    .coverpage{
        overflow-y:scroll;
        max-height:62vh;
        min-height:62vh;
        &::-webkit-scrollbar{
            width:0.2rem;
            &-thumb{
                background:#ffffff39;
                width:0.1rem;
                border-radius:1rem;

            }
        }
        .singlemessage{
            margin-top:20px;
            span{
                display:block;
               
            }
          

        }
    }
    .spaStack{
        display:flex;
        justify-content:start;
        align-items:center;
        @media screen and (max-width:750px) and (min-width:70px) {
            justify-content:end;
            
        }
    }
}


`
const Message = () => {
    const currentUser = useSelector(SelectCurrentUser);
    const dispatch = useDispatch();
    const socket = useSelector(Selectsocket);
    const [value, setvalue] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const friendId = useSelector(SelectCurrentFriend);
    const  fromUsername =useSelector(state=>selectUserById(state,friendId))

    const host = "http://localhost:4000/message/addmessage";

    useEffect(() => {
        if (socket) {
            socket.on("msg-recieve", (msg) => {
                if(msg.from==friendId){

                    dispatch(Sendmsg({ ...msg, fromSelf: false }))
                }else{
                    toast.success(`${msg?.username} sent you message`)
                }
            })
        }
    })


    const HandleEmojiClick = (event, emoji) => {
        setvalue(prev=>prev+=emoji.emoji)
        setShowEmoji(false)

    }

    const PickerComponent = () => {
        return (
            <div id="PickerComponent">
                <Picker onEmojiClick={HandleEmojiClick} />
            </div>
        )
    }

    const SendMessage = async () => {
        try {
            if (value.length > 0) {
                let data = { From: currentUser._id, To: friendId, message: value, time: new Date().toISOString() }
                setvalue("")
                await axios.post(host, data).then(res => {
                    if (res.data.status) {
                        dispatch(Sendmsg({ fromSelf: true, message: value, time: new Date().toISOString() }))
                        socket.emit("send-msg", ({ ...data, fromSelf: false, username:fromUsername.Username}))
                    } else {
                        toast.error("Fail to send the message", toastifyOptions)
                    }
                })
            } else {
                toast.warning("Please write what you want to send ", toastifyOptions)
            }
        } catch (err) {
            console.log(err.Message)
        }
    }
    let { Friends } = currentUser
    let roar = "message";
    return (
        <div>
            <NavBar roar={roar} />
            <GoodContainer className=' ps-2' >
                <div className=' w-100 mt-5 superFather '>
                    <div className='mx-auto h-100  rowFather'>
                        <div className='colFirstChild border' >
                            <div className='my-4 border py-4  displayNone' >
                                <Avatar sx={{ bgcolor: deepOrange[500] }} src={currentUser && currentUser.ProfilePic} />
                                <article>
                                    {currentUser.Username}
                                </article>
                            </div>
                            <FriendStyle>
                                {
                                    Friends.map((friend, index) => (
                                        <SingleMesageUser key={index} id={friend} />
                                    ))
                                }
                            </FriendStyle>
                        </div>
                        <Mess className='colSecondChild h-100 border text-center' style={{ height: "100%" }}>
                            <MessageContainer />
                            {friendId && <div className='input'>  <button className='btn' onClick={() => setShowEmoji(!showEmoji)}><BsEmojiSmile className='EmojiShowerEmoji' /></button>{
                                showEmoji ?
                                    <div><PickerComponent /></div> : ""
                            }<input type="text" value={value} onChange={(e)=>setvalue(e.target.value)} className='form-control' /> <button className='btn' onClick={SendMessage}><IoMdSend /></button></div>}
                        </Mess>
                    </div>
                </div>
            </GoodContainer>
            <ToastContainer />
        </div>
    )
}

const GoodContainer = styled.section`
min-height:75vh;
width:100%;
.superFather{
    height:100%;
    width:100%;
    display:flex;
    .rowFather{
        display:flex;
        width:80%;
        .colFirstChild{
            width:40%;
            max-height:78.5vh;
            border:1px solid red;
            min-height:75vh;

            .displayNone{
                display:flex;
                align-items:center;
                justify-content:center;
            }
        }
        .colSecondChild{
            width:60%;
        }
    }
}
@media screen and (max-width:750px) and (min-width:70px) {
    margin-bottom:30px;
    .superFather{
        height:100%;
        width:100%;
        display:flex;
        .rowFather{
            display:flex;
            flex-direction:column;
            width:100%;
            .colFirstChild{
                width:96%;
                min-height:22vh;
                .displayNone{
                    display:none;
                    border:1px solid red;
                    gap:10px;
                }
            }
            .colSecondChild{
                width:96%;
            }
        }
    }
}
`
const Mess = styled.div`
.input{
    display:flex;
    input{
        width:80%;
    }
    button{
        svg{
            font-size:30px;
        }
    }
}

`
const FriendStyle = styled.section`
max-height:72%; 
overflow-y:scroll;
gap:10px;
&::-webkit-scrollbar{
    width:10px;
}

@media screen and (max-width:750px) and (min-width:70px) {
    max-height:18vh; 
    border:1px solid red;
    overflow-y:hidden;
    overflow-x:scroll;
    display:flex;
}
`

export default Message