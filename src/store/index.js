import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../Apislice";
import UserRedux from "../Component/Profile/UserRedux";
import MessageRedux from "../Component/HomePage/Messge.redux";
import SignUpRedux from "../Component/SignupFolder/SignUp.Redux";
export const store =configureStore({
    reducer:{
        [ApiSlice.reducerPath]:ApiSlice.reducer,
        user:UserRedux,
        currentFriend:MessageRedux,
        signupUser:SignUpRedux
    },
    middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(ApiSlice.middleware)
})