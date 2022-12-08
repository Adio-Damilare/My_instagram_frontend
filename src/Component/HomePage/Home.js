
import React from 'react'
import NavBar from '../Dashboard.js/NavBar'
import UserForFollow from '../Dashboard.js/UserForFollow'
import DescriptSwitch from './DescriptSwitch'
import FriendStatus from './FriendStatus'
import PostComp from './PostComp'
import { useSelector } from 'react-redux'
import { SelectCurrentUser } from '../Profile/UserRedux'


const Home = () => {
    const currentUser=useSelector(SelectCurrentUser);
    const {Friends} = currentUser?currentUser:[];
    let roar="home";
    return (
        <>
          <NavBar icon={roar} />
            <div className='container-fluid'>
                <div className='row px-lg-5' >
                    <div className='col-lg-8 col-sm-10 mx-auto row'>
                        <div className='col-lg-7 col-sm-11 pt-2' id='fullScreen333'>
                            <div className='table-responsive  border overFlowHorizontal rounded-top mb-3' style={{height:"100px",overflowY:'hidden'}} >
                                <table className=' table-responsive h-100' >
                                    <tr className=' h-100'>{
                                        Friends&& Friends.map((user,index)=>(
                                        <>{
                                        user!=currentUser._id&&<td key={index} className='h-75'><FriendStatus user={user} /></td>
                                    } </> ))}
                                    </tr>

                                </table>
                            </div>
                            <div  id="workDestroyer" className=" bg-light"></div>
                               <div>
                                    <PostComp  />
                               </div>
                        </div>
                        <div className='col-4 px-4' id='intikole' style={{ position: "fixed", right: "166px", top: "80px" }}>
                            <DescriptSwitch />
                            <div className='d-flex ' style={{justifyContent:"space-between",alignItems:"center"}}><strong style={{fontSize:"14px"}}>Suggestion for you </strong> <button className='btn text-muted' style={{fontSize:"12px"}}>see all</button></div>
                            <div className='mt-2'>
                             <UserForFollow />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
        </>
    )
}

export default Home