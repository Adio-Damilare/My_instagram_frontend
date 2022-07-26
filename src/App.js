import React from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './Component/SignupFolder/SignUp';
import SignIn from './Component/SigninFolder/SignIn';
import Birthday from './Component/SignupFolder/Birthday';
import ConfirmOfPassword from './Component/SignupFolder/ConfirmOfPassword';
import NavBar from './Component/Dashboard.js/NavBar';
import SuggestPage from './Component/Dashboard.js/SuggestPage';
import UserForFollow from './Component/Dashboard.js/UserForFollow';
import AboutUser from './Component/Dashboard.js/AboutUser';
import ReactDropdown from './Component/ReactDropdown';
import Profile from './Component/Profile/Profile';
import PostComp from './Component/HomePage/PostComp';
import Home from './Component/HomePage/Home';
import DescriptSwitch from './Component/HomePage/DescriptSwitch';
import FriendStatus from './Component/HomePage/FriendStatus';
import ShoppingCart from './Component/Practice/ShoppingCart';
import Popup from './Component/Practice/Popup';
import styled from 'styled-components';
import LoadingGif from './Component/Dashboard.js/LoadingGif';
import DragFiles from './Component/Dashboard.js/DragFiles';
import AccordionList from './Component/HomePage/Accordion/AccordionList';
import Carousel from './Component/HomePage/Carousel/Carousel';
import LabTabs from './Component/Profile/Tab';
import Message from './Component/HomePage/Message';
import Eplore from './Component/HomePage/Explore';


const  App=()=>{
  return(
    <>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="about/:username" element={<AboutUser />} />
        <Route path="/bb" element={<SuggestPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/drop2" element={<UserForFollow />} />
        <Route path="/drop3" element={<ConfirmOfPassword />} />
        <Route path="/drop4" element={<ReactDropdown />} />
        <Route path="/ss" element={<PostComp />} />
        <Route path="/ss56" element={<LoadingGif />} />
        <Route path="/carousel" element={<Carousel/>} />
        <Route path="/sse" element={<NavBar/>} />
        <Route path="/message" element={<Message/>} />
        <Route path="/explore" element={<Eplore/>} />
        <Route path="/sse2" element={<DescriptSwitch />} />
        <Route path="/sse3" element={<FriendStatus />} />
        <Route path="/shopping" element={<ShoppingCart />} />
        <Route path="/were" element={<DragFiles/>} />
        <Route path="/were2" element={<AccordionList/>} />
        {/* <Route path="/Tab" element={<LabTabs/>} /> */}
        <Route path="/Tab" element={<Popup/>} />
      </Routes>
    </>
  )
}

export default App;
