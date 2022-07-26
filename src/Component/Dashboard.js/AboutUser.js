import { useParams } from "react-router-dom"
import React,{useEffect,useState} from 'react'
import axios from "axios"


function AboutUser() {
  const {username}= useParams()
  const [user, setuser] = useState({})
  const URL="http://localhost:4000/user/findoneuser"
  useEffect(() => {
    findUser()
  }, [])
  const findUser=()=>{
    axios.post(URL,username).then((res)=>{
      console.log(res.data)
      setuser(res.data.user)
    }).then((error)=>{
      if(error){
        console.log(error)
      }
    })
  }
  
  return (
    <div>AboutUser</div>
  )
}

export default AboutUser