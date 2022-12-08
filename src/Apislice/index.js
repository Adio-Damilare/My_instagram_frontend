import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const ApiSlice=createApi({
    reducerPath:"Apislice",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:4000"}),
    tagTypes:["Users,Posts"],
    endpoints:builder=>({

    })
})