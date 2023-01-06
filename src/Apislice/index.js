import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const ApiSlice=createApi({
    reducerPath:"Apislice",
    baseQuery:fetchBaseQuery({baseUrl:"https://instagram-server-side-gau760amz-adio-damilare.vercel.app/"}),
    tagTypes:["Users,Posts"],
    endpoints:builder=>({

    })
})