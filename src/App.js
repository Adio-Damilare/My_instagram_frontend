import React from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './Component/SignupFolder/SignUp';
import SignIn from './Component/SigninFolder/SignIn';
import SuggestPage from './Component/Dashboard.js/SuggestPage';
import AboutUser from './Component/Dashboard.js/AboutUser';
import Profile from './Component/Profile/Profile';
import Home from './Component/HomePage/Home';
import DescriptSwitch from './Component/HomePage/DescriptSwitch';
import FriendStatus from './Component/HomePage/FriendStatus';
import Message from './Component/HomePage/Message';
import Explore from './Component/HomePage/Explore';
import LayOut from './LayOut';
import ProtectLayout from './ProtectLayout';
import { useSelector } from 'react-redux';
import { getSignUpUser } from './Component/SignupFolder/SignUp.Redux'; 
import Birthday from './Component/SignupFolder/Birthday';
import ConfirmOfEmail from './Component/SignupFolder/ConfirmOfEmail';
import SINGLE from './Component/HomePage/SINGLE';

const  App=()=>{
  const SignUpUser=useSelector(getSignUpUser)
  return(
    <>
      <Routes>
        <Route path='/' element={<LayOut/>}>
        <Route index element={<SignUp />} />
        <Route path='birthday' element={ SignUpUser ? <Birthday/> :<Navigate to="/"/>} />
        <Route path='verifyemail' element={ <ConfirmOfEmail/>} />
        <Route path="signin" element={<SignIn />} />
        <Route path='user/' element={<ProtectLayout/>}>
        <Route path="home" element={<Home/>} />
        <Route path="about/:username" element={<AboutUser />} />
        <Route path="suggest" element={<SuggestPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="message" element={<Message/>} />
        <Route path="explore" element={<Explore/>} />
        <Route path='Post/:postId' element={<SINGLE/>}/>
        <Route path="sse2" element={<DescriptSwitch />} />
        <Route path="sse3" element={<FriendStatus />} />
        <Route path='suggestuser' element={<SuggestPage/>}/>
        <Route path='*' element={<Navigate to="/"/>}/>
        </Route>
        </Route>
      </Routes>
    </>
  )
}
export default App;
