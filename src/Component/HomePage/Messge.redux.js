import { createSlice } from "@reduxjs/toolkit";
const initialState={
    currentFriend:undefined,
    messages:undefined,
    socket:undefined
}

 const MessageSlice=createSlice({
    name:"message",
    initialState,
    reducers:{
        AddFriend:(state,action)=>{
            state.messages=undefined
            state.currentFriend=action.payload
        },
        SetMessage:(state,action)=>{
            state.messages=action.payload
        },
        Setsocket:(state,action)=>{
            state.socket=action.payload
        },
        Sendmsg:(state,action)=>{
            let messages=state.messages;
            if(messages){
                messages.push(action.payload)
            }else{
                messages=[action.payload]
            }
            state.messages=messages
        },
        LogOutMessage:(state,action)=>{
            state.currentFriend=undefined;
            state.messages=undefined;
        }
    }
})


export const {AddFriend,Setsocket,SetMessage,Sendmsg,LogOutMessage} = MessageSlice.actions;
export default MessageSlice.reducer;
export const SelectCurrentFriend=(state)=>state.currentFriend.currentFriend;
export const Selectmessages=(state)=>state.currentFriend.messages;
export const Selectsocket=(state)=>state.currentFriend.socket;