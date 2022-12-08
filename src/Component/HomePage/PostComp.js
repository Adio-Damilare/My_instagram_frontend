import React,{useState,useEffect} from 'react'
import { selectAllPosts } from '../../PostSlice'
import { useSelector } from 'react-redux';
import SinglePost from './SinglePost';
import styled from 'styled-components';

const PostComp = ({val, index}) => {
    const Posts =useSelector(selectAllPosts)
    
    return (
        <Container>
        {
             Posts.map((post,index)=>(
            <SinglePost post={post} key={index}/>
            ))
        }
            
        </Container>
    )
}

const Container=styled.div`

`


export default PostComp