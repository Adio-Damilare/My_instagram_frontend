import { createSlice } from "@reduxjs/toolkit";

const initialState={
    User:undefined
}
const SignUpRedux=createSlice({
    name:"signup",
    initialState,
    reducers:{
        FirstPage:(state,action)=>{
            state.User=action.payload
        }
   }
})

export const {FirstPage}=SignUpRedux.actions;
export default SignUpRedux.reducer
export const getSignUpUser=(state)=>state.signupUser.User