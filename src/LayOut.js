import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectAllPosts } from './PostSlice';
import { Typewriter } from 'react-simple-typewriter';
import styled from "styled-components"

const LayOut = () => {
  const Allposts=useSelector(selectAllPosts)
  return (
    
    <main>{Allposts.length>0?<Outlet/>:<Loading/>}</main>
  )
}


const Loading=()=>{
  return(
    <Container><div> Please wait <span><Typewriter words={[".......",".......",".......",".......",".......",]} loop={500}/></span></div></Container>
  )
}
const Container=styled.section`
max-height:100Vh;
min-height:100Vh;
display:flex;
justify-content:center;
align-items:center;
div{
  font-size:20px;
  span{
    font-size:30px;
  }
}


`

export default LayOut