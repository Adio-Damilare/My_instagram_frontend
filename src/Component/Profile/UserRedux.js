import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user:undefined,
}

const UserRedux=createSlice({
    name:"user",
    initialState,
    reducers:{
        SetUser:(state,action)=>{
            state.user=action.payload;
        },
        ChangeProfilePic:(state,action)=>{
            let user=state.user;
            state.user={...user,ProfilePic:action.payload}
        },
        UploadPost:(state,action)=>{
            let user=state.user 
            let {post}=user
            user.post=[...post,action.payload]
            state.user=user
        },
        LogOut:(state,action)=>{
            state.user=undefined;
            localStorage.removeItem("SigninToken")
        },
        Following:(state,action)=>{
           let Friends= state.user.Friends;
           Friends.push(action.payload);
           state.user.Friends=Friends;
        }
    }
})

export const {SetUser,ChangeProfilePic,UploadPost,LogOut,Following}=UserRedux.actions;
export default UserRedux.reducer
export const SelectCurrentUser=state=>state.user.user;