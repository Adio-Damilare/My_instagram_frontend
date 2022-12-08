import React, { useState, useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'
import NavBar from '../Dashboard.js/NavBar'
import { SelectCurrentUser } from '../Profile/UserRedux'
import styled from 'styled-components'
import { useSelector ,useDispatch} from 'react-redux';
import { selectPostById } from '../../PostSlice'
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { selectUserById } from '../UserSlice/UsersSlice';

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
        }
        &::-webkit-scrollbar{
            display:none;
        }
    }
}
`
const Post=({id})=>{
    const Mypost=useSelector(state=>selectPostById(state,id))
    return(
        <div className='children'>
            <img src={Mypost&&Mypost?.ImageUpload[0]?.image} alt={Mypost && Mypost?.id}/>
                
        </div>
    )
}
const AboutUser = () => {
    const {username}=useParams()
    const {Friends:currentUser}=useSelector(SelectCurrentUser)
   const userInfo=useSelector((state)=>selectUserById(state,username));
  const {Friends,Follow,post}=userInfo;

    

    return (
        <>
                  <>
                        <NavBar />
                        <div className='container-fluid mt-3 rounded'>
                            <div className='row'>
                                <div className='col-lg-8 col-md-12 mx-auto border rounded-1 row pt-3'>
                                    <div className='   col-md-5 col-lg-3 col-sm-5 me-lg-5 ps-lg-5' id='picCol' style={{ height: "" }}>
                                        <div className='btn' id="stubornImage"  >
                                        <Avatar sx={{ bgcolor: deepOrange[500] }} src={userInfo.ProfilePic} className="h-100 w-100"></Avatar>
                                        </div>
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-sm-6  ms-lg-2' id='labelCol'>
                                        <div className='d-flex pt-3  ' id='descendantOfLabel' style={{ justifyContent: "space-evenly" }}>
                                            <p style={{ fontSize: "27px", fontWeight: "lighter" }} className="text-muted">{userInfo&&userInfo?.Username}</p>
                                            {
                                                currentUser.includes(userInfo.id)?<button className='btn'>Following</button>:<button className='btn'>Follow</button>
                                            }
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
                    </>
        </>
    )
}

export default AboutUser