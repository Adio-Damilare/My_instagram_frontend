import React from 'react'
import LogoS7 from "../Images/istagram2.png"
import LogoS1 from "../Images/Home.png"
import LogoS2 from "../Images/message.png"
import LogoS3 from "../Images/AddFriend.png"
import LogoS4 from "../Images/clock.png"
import LogoS5 from "../Images/love.png"
import LogoS6 from "../Images/avatar.png"

function NavBar() {
    return (
        <>
            <div className='container-fluid ' id='navSticky'>
                <div className='row card border  ' style={{ padding: "13px 0px" }}>
                    <div className='col-12  row'>
                        <div className=' col-lg-4 col-sm-3 ms-lg-5 ms-md-2 row' id='increase1'>
                            <div className='col-lg-8 col-sm-12 '>
                                <img src={LogoS7} alt="istagram099" className="float-lg-end float-md-center float-sm-start" />
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-4   ' id="navbarD" style={{height:"37px" }}>
                            <div className='  px-3 h-100' >
                                <input type="text" style={{ backgroundColor: "whitesmoke", height: "100%", fontSize: "13px",width:"100%"}} className='form-control w-100 text-muted ' placeholder='Search' />
                                {/* <div className='border' style={{ position: "absolute" }} >
                                    h5555555555
                                </div> */}

                            </div>

                        </div>
                        <div className='col-lg-3 col-md-4 col-sm-5 row ms-2 mt-1' id='increase2'>
                            <div className='col-2 '><img src={LogoS1} alt="istagram400" className="" /></div>
                            <div className='col-2 '><img src={LogoS2} alt="istagram400" className="" /></div>
                            <div className='col-2 '><img src={LogoS3} alt="istagram400" className="" /></div>
                            <div className='col-2 '><img src={LogoS4} alt="istagram400" className="" /></div>
                            <div className='col-2 '><img src={LogoS5} alt="istagram400" className="" /></div>
                            <div className='col-2 '><img src={LogoS6} alt="istagram400" className="" /></div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default NavBar