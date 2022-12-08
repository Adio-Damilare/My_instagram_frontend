import axios from 'axios';
import React, { useEffect, useState,useRef } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { SetUser } from "./Component/Profile/UserRedux";
import { useDispatch } from 'react-redux';
import { UserSlice } from './Component/UserSlice/UsersSlice';
import { Typewriter } from 'react-simple-typewriter';
import { Setsocket } from './Component/HomePage/Messge.redux';
import {io} from "socket.io-client"


const ProtectLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const socket = useRef()
    const Url = "http://localhost:4000/user/token";
    const token = localStorage.getItem("SigninToken")
    const [result, setResult] = useState(false);
    const [resultUser, setResultUser] = useState(false);
    const GetCurrentUser = () => {
        if (token) {
            axios.get(Url, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            }).then((res) => {

                if (res?.data?.status) {
                    let user = (res.data.user)
                    delete user.Password;
                    const host = "http://localhost:4000";
                    socket.current = io(host);
                    socket.current.emit("add-user", user._id);
                    dispatch(Setsocket(socket.current));
                    dispatch(SetUser(user))
                    setResult(true)
                } else {
                    navigate("/")
                }
            })
        }
    }

    const GetAllUsers = async () => {
        dispatch(UserSlice.endpoints.getUsers.initiate()).then(res => {
            if (res.status === "fulfilled") {
                setResultUser(true)
            }
        })

    }

    const canGo = [result, resultUser].every(Boolean)
    useEffect(() => {
        if (token) {
            GetCurrentUser();
            GetAllUsers();
        }
    }, [])

    const Loading = () => {
        return (
            <div className='d-flex' style={{ alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <div style={{ fontSize: "30px" }}>Loading<Typewriter words={["......", "......", "......", "......", "......", "......", "......", "......"]} loop={50} /></div>
            </div>
        )
    }
    return (
        <div>
            {token ? <>{
                canGo ? <Outlet /> : <Loading />
            }</>
                :
                <Navigate to="/" />}
        </div>
    )
}

export default ProtectLayout