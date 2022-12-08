import React from 'react'
import { useSelector } from 'react-redux'
import Footer from '../Footer'
import NavBar from './NavBar'
import {selectAllUsers} from "../../Component/UserSlice/UsersSlice"
import SubFollow from './SubFollow';
import {SelectCurrentUser} from "../Profile/UserRedux"

function SuggestPage() {
  const users =useSelector(selectAllUsers)
  const currentUser=useSelector(SelectCurrentUser);
  const currentUserId=currentUser._id;
  const allUser = users.map((val, index) => {
    return (
       !currentUser.Friends.includes(val.id)&&val.id!==currentUserId&&!val.Follow.includes(currentUserId)&&<SubFollow user={val} key={index} />
    )
  })

  return (
    <>
      
         <div>
          <NavBar />
          <div className='container-fluid mt-3'>
            <div className='row  px-lg-5 px-md-3'>

              <div className='col-lg-6  col-md-9  col-sm-12 mx-auto  ' id='suggestpage'>
                <p className='text-bold'>Suggestions For You</p>
                <div className='card' style={{ padding: "0 5px 0 5px", marginTop: "-10px" ,minHeight:"60vh"}}>
                  {allUser}
                </div>
              </div>
            </div>
            <div className='container mt-5 '>
              <div className='container px-3'>
                <Footer />
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default SuggestPage