import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes,Navigate } from 'react-router-dom';
import SignUp from './Component/SignupFolder/SignUp';
import SignIn from './Component/SigninFolder/SignIn';
import Birthday from './Component/SignupFolder/Birthday';
import ConfirmOfPassword from './Component/SignupFolder/ConfirmOfPassword';
import NavBar from './Component/Dashboard.js/NavBar';
import SuggestPage from './Component/Dashboard.js/SuggestPage';
import UserForFollow from './Component/Dashboard.js/UserForFollow';

function App() {
  return (
    <>
    
    <Routes> 
      <Route path="/" element={<SignUp/>}/>
      <Route path="/home" element={<Navigate to="/"/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/bb" element={<SuggestPage/>}/>
    </Routes>
    </>
  );
}

export default App;
