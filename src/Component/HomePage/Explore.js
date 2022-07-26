import React,{useEffect, useState} from 'react'
import NavBar from '../Dashboard.js/NavBar'
import { Box } from '@mui/material'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from 'axios';


const Eplore = () => {
  const URL = "http://localhost:4000/user/home"
  const [posts,setPost]=useState([])
  useEffect(()=>{
    getAllPost()
  },[])
  const getAllPost=()=>{
    axios.get(URL).then((res)=>{
      if(res.data.status){
        // console.log(res.data)
           setPost(res.data.userPost)
          //  console.log(res.data.userPost)
       }
    })
  }
  let itemData=[];
  let roar = "explore"
  return (
    <div>
      <NavBar roar={roar} />
      <div className='container-fluid border '>

        <div className='row px-5'>
          <div className='col-lg-8 col-sm-10 mx-auto '>
            <Box className="h-100 w-100">
              <ImageList variant="masonry" cols={3} gap={8}>
                {posts.map((item ,index) => (
                  <ImageListItem key={index} style={{width:"250px"}}>
                    {
                      item.ImageUpload.length<=1?(
                        <img
                      src={`${item.ImageUpload[0].image}?w=248&fit=crop&auto=format`}
                      srcSet={`${item.ImageUpload[0].image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={item._id}
                      loading="lazy"
                    />
                      ):(
                        item.ImageUpload.map((val,index)=>(
                          <img
                          src={`${val.image}?w=248&fit=crop&auto=format`}
                          srcSet={`${val.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                          alt={item._id}  
                          loading="lazy" />
                        ))
                      )
                    }
                    
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Eplore