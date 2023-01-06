import React, { useState,useEffect } from 'react'
import birthday from "../Images/birthDayPic.png"
import {useFormik} from "formik" 
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { getSignUpUser } from './SignUp.Redux'; 
import { useSelector } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';
const URI = "https://instagram-server-side-gau760amz-adio-damilare.vercel.app/user/"
 
const Birthday=()=>{
    const Navigate=useNavigate()
    const SignUpUser=useSelector(getSignUpUser)
    const [disabledBtn, setdisabledBtn] = useState(true)
    const [message, SetMessage]=useState("")
    let number=Math.ceil(Math.random()*44499)
    if( number.toString().length<5 || number.toString().length>5){
        number =11435
    }

    const formik=useFormik({
        initialValues:{
        Year:"",
        Month:"", 
        Day:"",
        },
        onSubmit: async(values)=>{
            setdisabledBtn(true)
            try{
                const data={...SignUpUser,ProfilePic:SignUpUser.Username,Birthday:values,Verified:{
                    token:number,
                    verify:false
                }}
               await axios.post(URI,data).then(res=>{
                    if(res?.data?.status){
                        localStorage.setItem("userverifedEmail", JSON.stringify(SignUpUser.Email))
                        Navigate("/verifyemail")
                    }else{
                        toast.error(res.data.message)
                    }
                })

                console.log(values)

            }catch(err){
                console.log(err.message)
            }finally{
                setdisabledBtn(false)
            }
        },
        validationSchema:yup.object({
            "Year":yup.number().required("Year is required"),
            "Month":yup.string().required("Month is required"),
            "Day":yup.string().required("Day is required")
        })
    })
    
    const canSave=[formik.values.Day,formik.values.Month,formik.values.Year].every(Boolean)


   const HandleSubmit=()=>{
    if(canSave){
        formik.handleSubmit()
    }else{
        toast.error("fill this field")
    }
   }


   useEffect(()=>{
    if(canSave){
        setdisabledBtn(false)
    }
   },[canSave])
    
return (
        <div>
            <div className='row pt'>
                <div className='col-lg-4 col-md-7 col-sm-10 mx-auto pt-4 mt-2 ' id='spaceMuch' >
                    <div className='pt-3 card px-5'>
                        <div className='text-center mb-4 '> <img src={birthday} alt="istagram90" /></div>
                        <div className='text-center'>
                            <b style={{ fontSize: "17px", fontWeight: "lighter" }}>Add Your Birthday</b>
                        </div>
                        <div className='text-center mt-2'>
                            <b style={{ fontSize: "13px", fontWeight: "lighter" }}>This won't be a part of your public profile.</b>
                        </div>
                        <div className="modal fade  " id="staticBackdrop" data-bs-backdrop="static" style={{ marginTop: "-70px", borderRadius: "230px" }} data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content ">
                                    <div className="modal-header text-center">
                                        <div className="modal-title text-center " style={{ width: "80%", fontSize: "14px" }} id="staticBackdropLabel">Birthdays</div>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body px-3">
                                       <div className='text-center'>
                                        <img src={birthday} alt="birthday"/>
                                       </div>
                                       <div className='text-center mt-5'>
                                        <p style={{fontSize:"13px" , marginTop:"-17px"}}>
                                        Providing your birthday improves the features and
                                        </p>
                                        <p style={{fontSize:"13px", marginTop:"-17px"}}>
                                        ads you see, and helps us keep the Instagram
                                        </p>
                                        <p style={{fontSize:"13px", marginTop:"-17px"}}>
                                        community safe. You can find your birthday in your 
                                        </p>
                                        <p style={{fontSize:"13px", marginTop:"-17px"}}>
                                        Personal Information Account Settings.
                                        </p>
                                       </div>
                                    </div>
                                    <div className="modal-footer">
                                        <div className='w-100 text-center'>
                                        <p  className='text-decoration-none' style={{fontSize:"12px"}}>Learn More</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='text-center '>
                            <p style={{ fontSize: "12px", fontWeight: "lighter" }} className="text-primary btn  cursor-pointer"   data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Why do you need to provide birthday?</p>
                        </div>
                        <div className='mt-3 px-2'>
                            <select style={{ fontSize: "12px", outline: "none", padding: "10px 0 " }} name="Month"  onChange={formik.handleChange} value={formik.values.Month} className="border  rounded ms-2 ">
                                <option style={{ fontSize: "12px" }}>January</option>
                                <option style={{ fontSize: "12px" }}>February</option>
                                <option style={{ fontSize: "12px" }}>March</option>
                                <option style={{ fontSize: "12px" }}>April</option>
                                <option style={{ fontSize: "12px" }}>May</option>
                                <option style={{ fontSize: "12px" }}>June</option>
                                <option style={{ fontSize: "12px" }}>July</option>
                                <option style={{ fontSize: "12px" }}>August</option>
                                <option style={{ fontSize: "12px" }}>September</option>
                                <option style={{ fontSize: "12px" }}>October</option>
                                <option style={{ fontSize: "12px" }}>November</option>
                                <option style={{ fontSize: "12px" }}>December</option>
                            </select>
                            <select style={{ fontSize: "12px", outline: "none", padding: "10px 7px " }} name="Day" onChange={formik.handleChange} value={formik.values.Day} className="border  rounded ms-3 ">
                                <option style={{ fontSize: "12px" }}>1</option>
                                <option style={{ fontSize: "12px" }}>2</option>
                                <option style={{ fontSize: "12px" }}>3</option>
                                <option style={{ fontSize: "12px" }}>4</option>
                                <option style={{ fontSize: "12px" }}>5</option>
                                <option style={{ fontSize: "12px" }}>6</option>
                                <option style={{ fontSize: "12px" }}>7</option>
                                <option style={{ fontSize: "12px" }}>8</option>
                                <option style={{ fontSize: "12px" }}>9</option>
                                <option style={{ fontSize: "12px" }}>10</option>
                                <option style={{ fontSize: "12px" }}>11</option>
                                <option style={{ fontSize: "12px" }}>12</option>
                                <option style={{ fontSize: "12px" }}>13</option>
                                <option style={{ fontSize: "12px" }}>14</option>
                                <option style={{ fontSize: "12px" }}>15</option>
                                <option style={{ fontSize: "12px" }}>16</option>
                                <option style={{ fontSize: "12px" }}>17</option>
                                <option style={{ fontSize: "12px" }}>18</option>
                                <option style={{ fontSize: "12px" }}>19</option>
                                <option style={{ fontSize: "12px" }}>20</option>
                                <option style={{ fontSize: "12px" }}>21</option>
                                <option style={{ fontSize: "12px" }}>22</option>
                                <option style={{ fontSize: "12px" }}>23</option>
                                <option style={{ fontSize: "12px" }}>24</option>
                                <option style={{ fontSize: "12px" }}>25</option>
                                <option style={{ fontSize: "12px" }}>26</option>
                                <option style={{ fontSize: "12px" }}>27</option>
                                <option style={{ fontSize: "12px" }}>28</option>
                                <option style={{ fontSize: "12px" }}>29</option>
                                <option style={{ fontSize: "12px" }}>30</option>
                                <option style={{ fontSize: "12px" }}>31</option>
                            </select>
                            <select style={{ fontSize: "12px", outline: "none", padding: "10px 0 " }} name="Year"  onChange={formik.handleChange} value={formik.values.Year} className="border  rounded ms-3 ">
                                <option style={{ fontSize: "12px" }}>2022</option>
                                <option style={{ fontSize: "12px" }}>2021</option>
                                <option style={{ fontSize: "12px" }}>2019</option>
                                <option style={{ fontSize: "12px" }}>2018</option>
                                <option style={{ fontSize: "12px" }}>2017</option>
                                <option style={{ fontSize: "12px" }}>2016</option>
                                <option style={{ fontSize: "12px" }}>2015</option>
                                <option style={{ fontSize: "12px" }}>2014</option>
                                <option style={{ fontSize: "12px" }}>2013</option>
                                <option style={{ fontSize: "12px" }}>2012</option>
                                <option style={{ fontSize: "12px" }}>2011</option>
                                <option style={{ fontSize: "12px" }}>2009</option>
                                <option style={{ fontSize: "12px" }}>2008</option>
                                <option style={{ fontSize: "12px" }}>2007</option>
                                <option style={{ fontSize: "12px" }}>2006</option>
                                <option style={{ fontSize: "12px" }}>2005</option>
                                <option style={{ fontSize: "12px" }}>2004</option>
                                <option style={{ fontSize: "12px" }}>2003</option>
                                <option style={{ fontSize: "12px" }}>2002</option>
                                <option style={{ fontSize: "12px" }}>2001</option>
                                <option style={{ fontSize: "12px" }}>2000</option>
                                <option style={{ fontSize: "12px" }}>1999</option>
                                <option style={{ fontSize: "12px" }}>1998</option>
                                <option style={{ fontSize: "12px" }}>1997</option>
                                <option style={{ fontSize: "12px" }}>1996</option>
                                <option style={{ fontSize: "12px" }}>1995</option>
                                <option style={{ fontSize: "12px" }}>1994</option>
                                <option style={{ fontSize: "12px" }}>1993</option>
                                <option style={{ fontSize: "12px" }}>1992</option>
                                <option style={{ fontSize: "12px" }}>1991</option>
                                <option style={{ fontSize: "12px" }}>1990</option>
                                <option style={{ fontSize: "12px" }}>1989</option>
                                <option style={{ fontSize: "12px" }}>1988</option>
                                <option style={{ fontSize: "12px" }}>1987</option>
                                <option style={{ fontSize: "12px" }}>1986</option>
                                <option style={{ fontSize: "12px" }}>1985</option>
                                <option style={{ fontSize: "12px" }}>1984</option>
                                <option style={{ fontSize: "12px" }}>1983</option>
                                <option style={{ fontSize: "12px" }}>1982</option>
                                <option style={{ fontSize: "12px" }}>1981</option>
                                <option style={{ fontSize: "12px" }}>1980</option>
                                <option style={{ fontSize: "12px" }}>1979</option>
                                <option style={{ fontSize: "12px" }}>1978</option>
                                <option style={{ fontSize: "12px" }}>1977</option>
                                <option style={{ fontSize: "12px" }}>1976</option>
                                <option style={{ fontSize: "12px" }}>1975</option>
                                <option style={{ fontSize: "12px" }}>1974</option>
                                <option style={{ fontSize: "12px" }}>1973</option>
                                <option style={{ fontSize: "12px" }}>1972</option>
                                <option style={{ fontSize: "12px" }}>1971</option>
                                <option style={{ fontSize: "12px" }}>1970</option>
                                <option style={{ fontSize: "12px" }}>1969</option>
                                <option style={{ fontSize: "12px" }}>1968</option>
                                <option style={{ fontSize: "12px" }}>1967</option>
                                <option style={{ fontSize: "12px" }}>1966</option>
                                <option style={{ fontSize: "12px" }}>1965</option>
                                <option style={{ fontSize: "12px" }}>1964</option>
                                <option style={{ fontSize: "12px" }}>1963</option>
                                <option style={{ fontSize: "12px" }}>1962</option>
                                <option style={{ fontSize: "12px" }}>1961</option>
                                <option style={{ fontSize: "12px" }}>1960</option>
                                <option style={{ fontSize: "12px" }}>1959</option>
                                <option style={{ fontSize: "12px" }}>1958</option>
                                <option style={{ fontSize: "12px" }}>1957</option>
                                <option style={{ fontSize: "12px" }}>1956</option>
                                <option style={{ fontSize: "12px" }}>1955</option>
                                <option style={{ fontSize: "12px" }}>1954</option>
                                <option style={{ fontSize: "12px" }}>1953</option>
                                <option style={{ fontSize: "12px" }}>1952</option>
                                <option style={{ fontSize: "12px" }}>1951</option>
                                <option style={{ fontSize: "12px" }}>1950</option>
                                <option style={{ fontSize: "12px" }}>1949</option>
                                <option style={{ fontSize: "12px" }}>1948</option>
                                <option style={{ fontSize: "12px" }}>1947</option>
                                <option style={{ fontSize: "12px" }}>1946</option>
                                <option style={{ fontSize: "12px" }}>1945</option>
                                <option style={{ fontSize: "12px" }}>1944</option>
                                <option style={{ fontSize: "12px" }}>1943</option>
                                <option style={{ fontSize: "12px" }}>1942</option>
                                <option style={{ fontSize: "12px" }}>1941</option>
                                <option style={{ fontSize: "12px" }}>1940</option>
                                <option style={{ fontSize: "12px" }}>1939</option>
                                <option style={{ fontSize: "12px" }}>1938</option>
                                <option style={{ fontSize: "12px" }}>1937</option>
                                <option style={{ fontSize: "12px" }}>1936</option>
                                <option style={{ fontSize: "12px" }}>1935</option>
                                <option style={{ fontSize: "12px" }}>1934</option>
                                <option style={{ fontSize: "12px" }}>1933</option>
                                <option style={{ fontSize: "12px" }}>1932</option>
                                <option style={{ fontSize: "12px" }}>1931</option>
                                <option style={{ fontSize: "12px" }}>1930</option>
                                <option style={{ fontSize: "12px" }}>1929</option>
                                <option style={{ fontSize: "12px" }}>1928</option>
                                <option style={{ fontSize: "12px" }}>1927</option>
                                <option style={{ fontSize: "12px" }}>1926</option>
                                <option style={{ fontSize: "12px" }}>1926</option>
                                <option style={{ fontSize: "12px" }}>1925</option>
                                <option style={{ fontSize: "12px" }}>1924</option>
                                <option style={{ fontSize: "12px" }}>1923</option>
                                <option style={{ fontSize: "12px" }}>1923</option>
                                <option style={{ fontSize: "12px" }}>1921</option>
                                <option style={{ fontSize: "12px" }}>1920</option>
                                <option style={{ fontSize: "12px" }}>1919</option>
                            </select>
                        </div>
                        <div className=' text-center mt-3 text-muted'>
                            <p style={{ fontSize: "12px" }}>You need to enter the date you were born</p>
                        </div>
                        <div className=' text-center mt-1 text-muted'>
                            <p style={{ fontSize: "12px" }}>Use your own birthday, even if this account is for a business, a pet, or something else</p>
                        </div>
                        <div>
                            <button className='w-100 btn btn-primary' type='submit' disabled={disabledBtn} onClick={HandleSubmit}>Next</button>
                        </div>
                        <div className='mt-4 text-center'>
                            <p className='text-primary text btn '  style={{ fontSize: "12px" }} onClick={()=>Navigate(-1)}> Go Back</p>
                        </div>
                        <div className='mt-4 text-center'>
                
                        </div>
                    </div>
                </div>
            </div>

<ToastContainer/>
        </div>
    )
}

export default Birthday