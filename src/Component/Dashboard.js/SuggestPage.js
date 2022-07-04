import React, { useState } from 'react'
import Footer from '../Footer'
import NavBar from './NavBar'
import UserForFollow from './UserForFollow'

function SuggestPage() {

  return (
    <>
      <NavBar />
      <div className='container-fluid mt-3'>

        <div className='row  px-lg-5 px-md-3'>

          <div className='col-lg-6  col-md-9  col-sm-12 mx-auto  ' id='suggestpage'>
            <p className='text-bold'>Suggestions For You</p>
            <div className='card' style={{ padding: "0 5px 0 5px", marginTop: "-10px" }}>
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
              <UserForFollow />
            </div>
          </div>
        </div>
        <div className='container mt-5 '>
          <div className='container px-3'>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default SuggestPage