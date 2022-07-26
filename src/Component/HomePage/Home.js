import axios from 'axios'
import React, { useState, useEffect } from 'react'
import NavBar from '../Dashboard.js/NavBar'
import UserForFollow from '../Dashboard.js/UserForFollow'
import DescriptSwitch from './DescriptSwitch'
import FriendStatus from './FriendStatus'
import PostComp from './PostComp'

const Home = () => {
    const URL = "http://localhost:4000/user/home"
    const URL2 = "http://localhost:4000/user/fetchuser"
    const deviceId = JSON.parse(localStorage.deviceId)
    const body = { id: deviceId }
    const [home, sethome] = useState([])
    const [Users, setUsers] = useState([])
    const [UsersLength, setUsersLength] = useState(0)
    useEffect(() => {
            getLandingPage()
    }, [])

    const getLandingPage=()=>{
        axios.get(URL).then((res)=>{
           if(res.data.status){
            console.log(res.data)
               sethome(res.data.userPost)
           }
        }).then((error)=>{
            if(error){
                console.log(error)
            }
        })
    }

    const fetchuser=()=>{
        axios.get(URL2).then((res)=>{
           if(res.data.status){
            console.log(res.data)
                setUsers(res.data.user)
                // console.log(Users)
           }
        }).then((error)=>{
            if(error){
                console.log(error)
            }
        })
    }
    let roar="home"
    return (
        <>
            <NavBar icon={roar} />
            <div className='container-fluid'>
                <div className='row px-lg-5' >
                    <div className='col-lg-8 col-sm-10 mx-auto row'>
                        <div className='col-lg-7 col-sm-11 pt-2' id='fullScreen333'>
                            <div className='table-responsive border rounded-top mb-3' style={{height:"100px",overflowY:'hidden'}}>
                                <table className=' table-responsive h-100' >
                                    <tr className=' h-100'>
                                        <td className='h-75'>
                                            <FriendStatus />
                                        </td>
                                        <td className='h-75'>
                                            <FriendStatus />
                                        </td>
                                        <td className='h-75'>
                                            <FriendStatus />
                                        </td>
                                        <td className='h-75'>
                                            <FriendStatus />
                                        </td>
                                        <td className='h-75'>
                                            <FriendStatus />
                                        </td>
                                        <td className='h-75'>
                                            <FriendStatus />
                                        </td>
                                        <td className='h-75'>
                                            <FriendStatus />
                                        </td>
                                        <td className='h-75'>
                                            <FriendStatus />
                                        </td>
                                        <td className='h-75'>
                                            <FriendStatus />
                                        </td>
                                        <td className='h-75'>
                                            <FriendStatus />
                                        </td>
                                        <td className='h-75'>
                                            <FriendStatus />
                                        </td>
                                        <td className='h-75'>
                                            <FriendStatus />
                                        </td>
                                        <td className='h-75'>
                                            <FriendStatus />
                                        </td>
                                    </tr>

                                </table>
                            </div>
                            <div style={{ position: "absolute", width: "485px", top: "179px", zIndex: "300", height: "20px", border: "none", borderBottom: "1px solid whiteSmoke" }} id="workDestroyer" className=" bg-light "></div>
                            {
                                home.map((val,index)=>(
                                    <PostComp val={val} index={index} />

                                ))
                            }

                        </div>
                        <div className='col-4 px-4' id='intikole' style={{ position: "fixed", right: "166px", top: "80px" }}>
                            <DescriptSwitch />
                            <div className='d-flex ' style={{justifyContent:"space-between",alignItems:"center"}}><strong style={{fontSize:"14px"}}>Suggestion for you </strong> <button className='btn text-muted' style={{fontSize:"12px"}}>see all</button></div>
                            <div className='mt-2'>
                            <UserForFollow />

                                {
                                    Users.map((val,index)=>(
                        
                                        <UserForFollow val={val} index={index} />
                                    ))
                                }

                               
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home