import { createEntityAdapter,createSelector } from "@reduxjs/toolkit";
import { ApiSlice } from "../Apislice";

const postAdapter=createEntityAdapter({})

const initialState=postAdapter.getInitialState();

export const extendedPostslice=ApiSlice.injectEndpoints({
    endpoints:builder=>({
        getPost:builder.query({
            query:()=>"/post",
            transformResponse:res=>{
             const LoadData=res.userPost.map(post=>{
                 post.id=post._id
                return  post
             })
             return postAdapter.setAll(initialState,LoadData)
            },
            providesTags:(result,error,arg)=>[
                {type:"Post",id:"LIST"},
                ...result.ids.map(id=>({type:"Post",id}))
            ]
        })
    })
})
export const {useGetPostQuery}=extendedPostslice;
export const selectResult=extendedPostslice.endpoints.getPost.select();
const selectData=createSelector(selectResult,postResul=>postResul.data);
export const {selectAll:selectAllPosts,selectById:selectPostById,selectIds:selectPostIds,selectTotal:selectPostTotal}=postAdapter.getSelectors(state=>selectData(state) ?? initialState )
