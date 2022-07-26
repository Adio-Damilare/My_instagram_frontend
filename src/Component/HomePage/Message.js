import React from 'react'
import NavBar from '../Dashboard.js/NavBar'

const Message = () => {
    let roar="message"
  return (
    <div>
        <NavBar roar={roar}/>
        <div className='container-fluid border'>
            <div className='row px-lg-5'>
                <div className='col-lg-8 col-sm-10 mx-auto row'>
                <div className='col-6 border text-center'>
                    hello
                </div>
                <div className='col-6 border text-center'>
                    helloo
                </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Message