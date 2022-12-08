import React, { useEffect } from 'react'
import emailPic from "../Images/emailPic.png"
import { useFormik } from 'formik'
import * as yup from "yup";

const ConfirmOfEmail = () => {
 
  const [disable,setDisable]=React.useState(true)
  const token= JSON.parse(localStorage.getItem("userverifedEmail"))
  
  const formik=useFormik({
    initialValues:{
      token:""
    },onSubmit:(value)=>{

    },
    validationSchema:yup.object({
      token:yup.number().required("fill with token").min(5)
    })
  })

  useEffect(()=>{
    if(formik.values.token.length>=5){
      setDisable(false)
    }else{
      setDisable(true)
    }
  },[formik.values.token])

  
  return (
    <>
      <div className='row pt'>
        <div className='col-lg-4 col-md-7 col-sm-10 mx-auto pt-4 mt-2 ' id='spaceMuch'>
          <div className='pt-4 card px-2'>
            <div className='text-center mb-3 '> <img src={emailPic} alt="istagram4" /></div>
            <div className='text-center'>
              <b style={{ fontSize: "15px", fontWeight: "light" }}>Enter Confirmation Code</b>
            </div>
            <div className='text-center ' style={{ marginTop: "10px" }}>
              <p style={{ fontSize: "13px" }}>Enter the confirmation token  sent to</p>
            </div>
            <div className='text-center' style={{ marginTop: "-22px" }}>
              <b style={{ fontSize: "13px", fontWeight: "lighter" }}> {token} <p style={{ fontSize: "14px", fontWeight: "lighter" }} className="text-decoration-none" > Resend Code</p></b>
            </div>
            <div className='px-5 mt-4'>
              <input maxLength={5} className={!formik.touched.token ? "form-control mb-2  border  border-end-0" : formik.errors.token ? 'form-control is-invalid mb-2  border  border-end-0' : "form-control is-valid mb-2  border  border-end-0"} name='token'  onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              <button className='btn btn-primary w-100 mt-3' disabled={disable}>Next</button>
            </div>
            <div>
            </div>
            <div className='mt-4 text-center'>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmOfEmail