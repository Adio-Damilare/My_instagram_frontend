import React, { useState,useEffect } from 'react'
import istagramPhoto1 from "../Images/istagramPhoto1.png"
import facebookLogo from "../Images/facebook2.png"
import { useFormik } from "formik"
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"
import axios from 'axios'
import SecondFooter from '../SecondFooter'
import Footer from '../Footer'
function SignIn() {
  const [LocaKey, setLocaKey] = useState("")
  useEffect(() => {
      if(LocaKey){
          localStorage.deviceId= JSON.stringify(LocaKey)
      }
  }, [LocaKey])
  const Navigate= useNavigate()
  const URI="http://localhost:4000/user/signin"
  const [hide, sethide] = useState("")
  const [typePassword, settypePassword] = useState("password")
  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: ""
    },
    onSubmit:(values)=>{
      console.log(values)
      axios.post(URI,values).then((res)=>{
        if(res.status==200){
         setLocaKey(res.data.id)
         Navigate("/home")
        }
      }).then((error)=>{
        if(error){

          console.log(error)
        }
      })
    }, 
    validationSchema:yup.object({
      Email:yup.string().required("must be filled").email(),
      Password:yup.string().required("must fill").min(6,"fill")
    })
    
  })
  const passwordLength = () => {
    sethide("Show")

  }
  const changePassword = () => {
    if (formik.values.Password == "") {
      return
    }
    else {

      if (typePassword == "password" && hide == "Show") {
        settypePassword("text");
        sethide("Hide")
        return
      }
      settypePassword("password");
      sethide("Show")
    }
  }
  let para="Don't have an account?"
  let hrefTag="Sign up"
  const link="/"
  return (
    <>
      <div className='container '>
        <section className='row'>
          <div className='col-lg-4 col-md-8 col-sm-7 mx-auto pt-4 '>
            <div className='pt-5 card px-5'>
              <div className='text-center mb-3 '> <img src={istagramPhoto1} alt="istagram466" /></div>
              <div>
                
                <div className='form-floating mb-3' >
                  <input type="text"
                    style={{ fontSize: "11px" }} className={!formik.touched.Email ? "form-control " : formik.errors.Email ? "form-control is-invalid " : "form-control is-valid"}
                    id='email'
                    onChange={formik.handleChange}
                    name='Email'
                    value={formik.values.Email}
                    placeholder=' Email'
                    onBlur={formik.handleBlur} />
                  <label style={{ fontSize: "13px", fontWeight: "200px", paddingBottom: "1px" }}>Email</label>
                </div>
                <div
                  className={!formik.touched.Password ? 'input-group w-100  border border-1 rounded mb-4' : formik.errors.Password ? 'input-group w-100  border border-1 border-danger rounded mb-4' : "input-group w-100  border border-1 border-success rounded mb-4"}
                >
                  <div className='form-floating  short  '>

                    <input type={typePassword}
                      className={!formik.touched.Password ? "form-control mb-2  border  border-end-0" : formik.errors.Password ? 'form-control is-invalid mb-2  border  border-end-0' : "form-control is-valid mb-2  border  border-end-0"}
                      value={formik.values.Password}
                      onKeyPress={passwordLength}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name='Password'
                      id='email'
                      placeholder='Password' />
                    <label style={{ fontSize: "13px", fontWeight: "200px", }}>Password</label>
                  </div>
                  <span style={{ fontSize: "12px", marginLeft: "-10px" }} className='border border-0 bg-light input-group-text cursor-pointer' id='spanHide' onClick={changePassword}>{hide}</span>
                </div>
                <div> <button className='btn btn-primary w-100' onClick={formik.handleSubmit}>LOG IN</button></div>
                <div className='text-center '>
                  <div className="divider py-2">
                    <hr /> <span className="" id='orSpan'>OR</span>
                  </div>
                </div>
                <button className='bg-light border w-100 rounded text-primary text-center mt-2 py-1 border-0' ><img style={{ fontSize: "18px", wordSpacing: "1px", paddingLeft: "10px" }} className='image image-responsive' src={facebookLogo} alt="istagram67" /> <code className='text-dark ps-1 ' style={{fontWeight:"300px"}}> Log in with facebook</code></button>
                <div className='text-center my-3 '><p className='text-decoration-none text-dark' style={{fontSize:"12px"}}> Forgot password?</p></div>
              </div>
            </div>

          </div>
              <div className='' >
                <SecondFooter para={para} hrefTag={hrefTag} link={link}/>
              </div>
              <div className='my-4'>
                <Footer/>
              </div>
        </section>

      </div>
    </>
  )
}

export default SignIn 