import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import {ApiSlice} from "../../Apislice/index";

const userAdapter=createEntityAdapter({
})
const initialState=userAdapter.getInitialState()
export const UserSlice=ApiSlice.injectEndpoints({
    endpoints:builder=>({
        getUsers:builder.query({
            query:()=>"/user/fetchuser",
            transformResponse:responseData=>{
                const LoadData=responseData.user.map(user=>{
                    delete user.Password
                    user.id=user._id
                    return user
                })
                return userAdapter.setAll(initialState,LoadData)
            },  
            providesTags:(result,error,arg)=>[
                {type:"User",id:"LIST"},
                ...result.ids.map(id=>({type:"User",id}))
            ]
        })
    })
})


export const {useGetUsersQuery}=UserSlice
export const selectUsersResult=UserSlice.endpoints.getUsers.select();
const selectUsersData=createSelector(
    selectUsersResult, usersResult=>usersResult.data
)
export const {selectAll:selectAllUsers,selectById:selectUserById,selectIds:selectUserIds}=userAdapter.getSelectors(state=>selectUsersData(state) ?? initialState )