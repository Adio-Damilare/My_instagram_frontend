import React, {  useState } from 'react'
import NavBar from '../Dashboard.js/NavBar'
import { Box } from '@mui/material'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSelector } from 'react-redux';
import { selectAllPosts } from '../../PostSlice';


const Explore = () => {
  const posts=useSelector(selectAllPosts)
  const [fade, ] = useState(true)
  
  let roar = "explore";
  let shuffle = (array) => array.sort(() => Math.random() - 0.5);
   const[postS,]=useState(posts&&posts.length>0?shuffle(posts):[])
  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  let dat = 1
  let num = 1
  const check = (r) => {
    if (fade) {
      if (dat == 3 || dat == 6) {
        dat += 1
        num = 2
        return 2
      } else {
        if (dat >= 8) {
          num = 0
          dat = 1
          return num
        } else {
          
          num = 0
          dat += 1
          return num
        }

      }
    } else {
      num = 2
      return num

    }

  }

  return (

 <>
      <NavBar roar={roar} />
      <div className='container-fluid border pt-2 '>
        <div className='row '>
          <div className='col-lg-9 px-lg-5 col-md-11 col-sm-12 mx-auto '>
            <Box className="h-100 w-100">
              <ImageList
                style={{ height: "100%" }}
                variant="quilted"
                cols={4}
                rowHeight={285}
              >
                {postS.map((item, index) => (

                
               (
                      <ImageListItem key={item._id} className="px-lg-2 py-lg-2 py-sm-5 calculate" style={{ border: "10px, solid #fff" }} cols={check(index) || 1} rows={num || 1}>
                        {item.ImageUpload.length <= 1 ?
                          <img
                            {...srcset(item.ImageUpload[0].image, 300, num || 1, num || 1)}
                            alt={item._id}
                            loading="lazy"
                          /> :
                          <img
                            {...srcset(item.ImageUpload[0].image, 300, num || 1, num || 1)}
                            alt={item._id}
                            loading="lazy"
                          />
                        }
                      </ImageListItem>) 
                 
                
                ))}
              </ImageList>
            </Box>
          </div>
        </div>
      </div>
      </>

  )
}

export default Explore