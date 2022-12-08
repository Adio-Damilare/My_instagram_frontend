import React from 'react'
import styled from 'styled-components';
import { selectPostById } from '../../PostSlice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Carousel from './Carousel/Carousel';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { selectUserById } from '../UserSlice/UsersSlice';

const SINGLE = () => {
    const { postId } = useParams();
    const Post = useSelector((state) => selectPostById(state, postId));
    const { Userid } = Post
    const UserPost = useSelector((state) => selectUserById(state, Userid))
    // console.log(UserPost)
    const { ImageUpload } = Post

    return (
        <Container>
            <div className="image" >
                <div className='topBoy'>
                    <Avatar sx={{ bgcolor: deepOrange[500], }}  src={UserPost.ProfilePic} className="h-100 comeAnd " />
                    <article>{UserPost.Username} posts </article>
                </div>
                {ImageUpload.length <= 1 ?
                    ImageUpload.map((value, index) => (
                        (<div className='Imagechild' key={index}>
                            <img src={value.image} width="100%" alt={value.image} className='' height="100%" />
                        </div>
                        )
                    )) : (
                        <Carol data={ImageUpload} />
                    )
                }
            </div>
            <div className='giantOfAfrica'>


            </div>
        </Container>
    )
}
export default SINGLE
const Container = styled.section`
display:flex;
width:100%;
padding:20px;
border:1px solid red;
height:100vh;
justify-content:space-around;
.image{
    width:48%;
    height:100%;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
    box-shadow:2px 4px 10px 1px rgba(201,201,201,0.47) ;
    .Imagechild{
        height:90%;

    }
    .carousel{
        min-height:80%;
        max-height:80%;
        border:1px solid red;
        position:relative;
        .carouselGrandChild{
            position:absolute;
            min-height:100%;
            max-height:100%;        
            
        }
    }
    .topBoy{
        height:10%;
        display:flex;
        .comeAnd{
            width:60px;
            border:2px solid red

        }
    }
    
}
.giantOfAfrica{
    width:48%;
    height:100%;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
    box-shadow:2px 4px 10px 1px rgba(201,201,201,0.47) ;
    .topBoy{
        height:80px;
        div{ 
            height:90%;
            width:70px;
            border:2px solid red;
            img{
                height:100%;
                width:100%
            }
        }
    }
}
`



const Carol = ({ data }) => {
    const settings = {
        dots: false,
        focusOnSelect: true,
        infinite: true,
        speed: 800,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
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
        <Slider className='carousel' {...settings}>
            {data.map((item, index) => (
                <img className='carouselGrandChild ' key={index} src={item.image} />
            ))
            }
        </Slider>

    )
}

