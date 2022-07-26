import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Footer from '../Footer'
import Isloading from '../Isloading'
import NavBar from './NavBar'
import UserForFollow from './UserForFollow'

function SuggestPage() {
  const URL = "http://localhost:4000/user/fetchuser"
  const [users, setusers] = useState([])
  const [isload, setIsload] = useState(true)
  const [mess, setmess] = useState('')
  useEffect(() => {
    displayUser()
  }, [])

  const displayUser = () => {
    axios.get(URL).then((res) => {
      if (res.status == 200) {
        if (res.data.status) {
          setIsload(false)
          // setusers(res.data.user)

          
        } else {
          setmess(res.data.message)
        }
      }
    }).catch((error) => {
      if (error) {
        console.log(error)
      }
    })
  }
  const allUser = users.map((val, index) => {
    
    return (
      <UserForFollow Username={val.Username} id={val._id} Fullname={val.Fullname} />
    )
  })

  return (
    <>
      {
        isload ? <div id='isloadingSuges' className='container-fluid'> <Isloading /> </div> : <div>
          <NavBar />
          <div className='container-fluid mt-3'>

            <div className='row  px-lg-5 px-md-3'>

              <div className='col-lg-6  col-md-9  col-sm-12 mx-auto  ' id='suggestpage'>
                <p className='text-bold'>Suggestions For You</p>
                <div className='card' style={{ padding: "0 5px 0 5px", marginTop: "-10px" }}>
                  {allUser}



                </div>
              </div>
            </div>
            <div className='container mt-5 '>
              <div className='container px-3'>
                <Footer />
                {/* <FloatingLettersTextBuilder
                  floatingSpeed={500}
                  lettersAppearanceDelay={250}
                > Floating Letters
                </FloatingLettersTextBuilder> */}
              </div>
            </div>
          </div>
        </div>}
    </>
  )
}

export default SuggestPage