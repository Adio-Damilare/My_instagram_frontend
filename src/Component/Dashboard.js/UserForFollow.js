import React from 'react'
import { useSelector } from 'react-redux'
import {selectAllUsers} from "../../Component/UserSlice/UsersSlice"
import { SelectCurrentUser } from '../Profile/UserRedux'
import SubFollow from './SubFollow'

function UserForFollow({val, index}) {
    const Users=useSelector(selectAllUsers)
    const currentUser=useSelector(SelectCurrentUser)
    const currentUserId=currentUser._id;
    const Friends=currentUser.Friends
    return (
        <div>
        {
            Users.map((user,index)=>(
               !Friends.includes(user._id)&& user.id!==currentUserId&&!user.Follow.includes(currentUserId)&&<SubFollow user={user} key={index}/>
            ))
        }
            
        </div>
    )
}

export default UserForFollow