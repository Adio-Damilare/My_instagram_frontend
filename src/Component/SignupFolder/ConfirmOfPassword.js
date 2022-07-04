import React from 'react'
import emailPic from "../Images/emailPic.png"

const ConfirmOfPassword=(props) =>{
  const {setdisplay}=props;

  const reverse1=()=>{
    setdisplay.setMode(false)
    setdisplay.setdisplay(false)
    setdisplay.setdisplay2(true)
    setdisplay.setdisplay3(false)

  }
  return (
    <>
       <div className='row pt'>
                    <div className='col-lg-4 col-md-7 col-sm-10 mx-auto pt-4 mt-2 '>
                        <div className='pt-4 card px-2'>
                            <div className='text-center mb-3 '> <img src={emailPic} alt="istagram4" /></div>
                            <div className='text-center'>
                                <b style={{ fontSize: "15px", fontWeight: "light" }}>Enter Confirmation Code</b>
                            </div>
                            <div className='text-center ' style={{marginTop:"10px"}}>
                              <p style={{fontSize:"13px"}}>Enter the confirmation code we sent to</p>
                            </div>
                            <div className='text-center' style={{marginTop:"-22px"}}>
                                <b style={{ fontSize: "13px", fontWeight: "lighter" }}>adiodamilare44@gmail.com  <p style={{ fontSize: "14px", fontWeight: "lighter" }} className="text-decoration-none" > Resend Code</p></b>
                               
                            </div>
                            <div className='px-5 mt-4'>
                              <input className='form-control'/>
                              <button className='btn btn-primary w-100 mt-3'> Next</button>
                            </div>
                         
                            <div>
                            </div>
                            <div className='mt-4 text-center'>
                               <p className='text-primary text btn ' onClick={reverse1} style={{fontSize:"12px"}}> Go Back</p>
                            </div>
                        </div>
                    </div>
                </div>
    </>
  )
}

export default ConfirmOfPassword