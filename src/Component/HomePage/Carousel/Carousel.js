import React from 'react'
 import Slider from "react-slick"
 import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Carousel = ({data}) => {
  
    const settings = {
      dots: true,
      focusOnSelect: true,
      infinite: true,
      speed: 500,
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

  return (
    <div className='px-2 h-100'>
      <Slider className='h-100' {...settings}>
      { data.map((item,index)=>(
        <div className='h-100' key={index}>
            <div className=' ' style={{backgroundImage:`url(${item.image})`,height:"100%",backgroundSize:"cover",minHeight:"400px"}}>
            </div>
        </div>
      ))

        
      }
      </Slider>

    </div>
  )
}

export default Carousel