import React from 'react'
import user from "../Images/avatar2.png"

function UserForFollow() {
    return (
        <>
            <div className=' d-flex' style={{ height: "70px",justifyContent:"space-between" }}>
                <div className='d-flex'>
                    <big className='rounded-pill border ' style={{ height: "100%" }}>

                        <img src={user} title="folow" className='img' height="100%" />
                    </big>
                    <div className='ps-2'>
                        <p style={{ fontSize: "13px",  }} className="mt-3 cursor-pointer" id="mackBook">ADIO DAMILARE</p>
                        <p style={{ fontSize: "11px",margin:"-20px 0"  }} className="text-muted" >ADIO DAMILARE</p>
                        <p style={{ fontSize: "11px",margin:"18px 0" }} className="text-muted" >Popular</p>
                    </div>
                </div><div className='mt-3'>
                    <button className='btn btn-primary'>Follow</button>
                </div>
            </div>
        </>
    )
}

export default UserForFollow