import React, { useState, } from 'react'
import istagramPhoto1 from "../Images/istagramPhoto1.png"
import facebookLogo from "../Images/facebookLogo.png"
import Footer from '../Footer'
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import SecondFooter from '../SecondFooter'
import Birthday from './Birthday'
import ConfirmOfPassword from './ConfirmOfPassword'

const SignUp = () => {
    const [result, setresult] = useState("")
    const [mode, setMode] = useState(false)
    const [lode, setlode] = useState("")
    const FullnameRegex = /([\w])/
    const [hide, sethide] = useState("")
    const [display, setdisplay] = useState(true)
    const [display2, setdisplay2] = useState(false)
    const [display3, setdisplay3] = useState(false)
    const [typePassword, settypePassword] = useState("password")
    const URI = "http://localhost:4000/user/"
    const formik = useFormik({
        initialValues: {
            Fullname: "",
            Username: "",
            Email: "",
            Password: "",
            Birthday:{Year:"",Month:"January",Day:"1"}
        },
        onSubmit: (values) => {
        
            axios.post(URI, values).then((res) => {
                    if(res.status==200){
                        setresult(res.data.message)
                        console.log(res.data)
                        setMode(res.data.status)
                        setlode(res.data.status)
                        console.log(res.data.status)
                    }
                    else{
                        setMode("res.data.status")
                        setresult("res.data")
                    }

                return
            }).then((error) => {
                if (error) {

                    setMode("error")
                    setresult("error")
                }
            })


        },
        validationSchema: yup.object({
            Fullname: yup.string().required("Fullname is required").min(3, "Your Fulname must be atleast three character").matches(FullnameRegex, "Fullname can be only word"),
            Username: yup.string().required("Username is required").min(3, "your Username must be atleast three").matches(FullnameRegex, "This field can only contain word and number"),
            Email: yup.string().required("Email is required").email("invalid Email"),
            Password: yup.string().required("Password is required").min(6, "your password must be atleast six character"),
        })
    })


    const passwordLength = () => {
        sethide("Show")

    }
    const changePassword = () => {
        if (formik.values.Password === "") {
            return
        }
        else {

            if (typePassword === "password" && hide === "Show") {
                settypePassword("text");
                sethide("Hide")
                return
            }
            settypePassword("password");
            sethide("Show")
        }
    }

    const changeInterface=()=>{
        if(formik.errors.Fullname || formik.errors.Email || formik.errors.Username || formik.errors.Password ){

        }
        else if(formik.values.Fullname==="" || formik.values.Email==="" ||formik.values.Username===""|| formik.values.Password==="" ){
           


        }
        else{

            
            setdisplay(false)
            setdisplay2(true)
            setdisplay3(false)
            
        }
    }
const para="Have an account?"

const hrefTag="Log in"
const link= "/signin"

    
    // console.log(formik.)
    // console.log(formik.touched)
    // console.log(formik.errors.Email)

    return (
        <>
            <div className='container mb-5'  >
                <div className='container '  >
                   
                        <div className='row pt-5' style={display?{display:"block"}:{display:"none"} }>
                            <div className='col-lg-4 col-md-7 col-sm-10 mx-auto'  >
                                <div className='px-5  border border-1'>
                                    <div className='py-4 '>
                                        <div className='text-center '> <img src={istagramPhoto1} alt="istagram" /></div>
                                        <div className='text-muted text-center mb-2'> <b>Sign up to see photos and videos <br />from your friends.</b></div>
                                        <button className='bg-primary border w-100 rounded text-center mt-2 py-1' ><img style={{ fontSize: "18px", wordSpacing: "1px", paddingLeft: "10px" }} className='' src={facebookLogo} alt="istagram2" /> <code className='text-light ps-1 fs-bold'> Log in with facebook</code></button>
                                        <div className='text-center '>
                                            <div className="divider py-2">
                                                <hr /> <span className="" id='orSpan'>OR</span>
                                            </div>
                                        </div>
                                        <div>

                                            <div className='my-2'>
                                                <div className='form-floating' >
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
                                                <p style={{ fontSize: "12px", marginTop: '10px' }} className="text-danger">{formik.touched.Email ? formik.errors.Email : ""}</p>
                                            </div>
                                            <div className='mb-2'>
                                                <div className='form-floating'>
                                                    <input type="text"
                                                        className={!formik.touched.Fullname ? "form-control " : formik.errors.Fullname ? 'form-control is-invalid ' : "form-control is-valid"}
                                                        onChange={formik.handleChange}
                                                        name='Fullname'
                                                        value={formik.values.Fullname}
                                                        id='email'
                                                        placeholder='Fullname'
                                                        onBlur={formik.handleBlur} />
                                                    <label style={{ fontSize: "13px", fontWeight: "200px", }}>Fullname</label>

                                                </div>
                                                <p style={{ fontSize: "12px", marginTop: '10px' }} className="text-danger">{formik.touched.Fullname ? formik.errors.Fullname : ""}</p>
                                            </div>
                                            <div className='mb-2'>
                                                <div className='form-floating'>
                                                    <input type="text"
                                                        className={!formik.touched.Username ? "form-control " : formik.errors.Username ? "form-control is-invalid  " : "form-control is-valid "}
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        name='Username'
                                                        value={formik.values.Username}
                                                        id='email'
                                                        placeholder='Username' />
                                                    <label style={{ fontSize: "13px", fontWeight: "200px", }}>Username</label>
                                                </div>
                                                <p style={{ fontSize: "12px", marginTop: '10px' }} className="text-danger">{formik.touched.Username ? formik.errors.Username : ""}</p>
                                            </div>
                                            <div>
                                                <div
                                                    className={!formik.touched.Password ? 'input-group w-100  border border-1 rounded ' : formik.errors.Password ? 'input-group w-100  border border-1 border-danger rounded' : "input-group w-100  border border-1 border-success rounded"}
                                                >
                                                    <div className='form-floating  short '>

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
                                                <p style={{ fontSize: "12px", marginTop: '10px' }} className="text-danger">{formik.touched.Password ? formik.errors.Password : ""}</p>

                                            </div>

                                            <p style={{ fontSize: "12px", textAlign: "center", }} className="text-muted" >

                                                People who use our service may have uploaded your contact information to Instagram. <p style={{ textDecoration: "none" }} className="text-dark">Learn More</p>
                                            </p>
                                            <p style={{ fontSize: "12px", textAlign: "center" }} className="text-muted">
                                                By signing up, you agree to our Terms , Data Policy and Cookies Policy .
                                            </p>
                                            <div>

                                                <button className='btn btn-primary w-100' disabled={formik.errors ?false:true}  onClick={changeInterface}> SIGN UP</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={display2? {display2:"block"} :{display:"none"}}>
                            <Birthday formik={formik} setdisplay={{setdisplay,setdisplay2,setdisplay3,result,mode,setMode}}/>
                        </div>
                        <div style={display3? {display3:"block"} :{display:"none"}}>
                            <ConfirmOfPassword formik={formik} setdisplay={{setdisplay,setdisplay2,setdisplay3,setMode,lode}}/>
                        </div>
                 
                    <div>

                    <SecondFooter para={para} hrefTag={hrefTag} link={link}/>
                    </div>
                    <div className='mt-4 col-12'>
                        <Footer />
                    </div>
                </div>
            </div>


        </>
    )
}

export default SignUp