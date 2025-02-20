import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import toast from 'react-hot-toast'

const initialState = {
    loggedInStatus : JSON.parse(localStorage.getItem('loggedInStatus')) || false,
    userData : JSON.parse(localStorage.getItem('userData')) || {}
}

export const signupUser = createAsyncThunk('/user/signup',async(data,{rejectWithValue})=>{
    try{
        console.log(data)
        const promise = axios.post('/api/auth/signup',data,{withCredentials : true})
        toast.promise(promise,{
            loading : "Registering user",
            success : (res)=>res?.data?.message,
            error : (error)=>error?.response?.data?.message
        })
        return (await promise).data
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})

export const loginUser = createAsyncThunk('/user/login',async(data,{rejectWithValue})=>{
    try{
        const promise = axios.post('/api/auth/login',data,{withCredentials : true})
        toast.promise(promise,{
            loading : "Validating user",
            success : (res)=>res?.data?.message,
            error : (error)=>error?.response?.data?.message
        })
        return (await promise).data
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})

export const logoutUser = createAsyncThunk('/user/logout',async(_,{rejectWithValue})=>{
    try{
        const promise = axios.get('/api/auth/logout',{withCredentials : true})
        toast.promise(promise,{
            loading : "Logging out",
            success : (res)=>res?.data?.message,
            error : (err)=>err?.response?.data?.message
        })
        return (await promise).data
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})

export const getProfile = createAsyncThunk('/user/profile',async(_,{rejectWithValue})=>{
    try{
        const promise = axios.get('/api/users/getprofile')
        toast.promise(promise,{
            loading : "Fetching user details",
            success : (res)=>res?.data?.message,
            error : (err)=>err?.response?.data?.message
        })
        return (await promise).data
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            localStorage.setItem('loggedInStatus',true)
            localStorage.setItem('userData',JSON.stringify(action?.payload?.data))
            state.loggedInStatus = true,
            state.userData = action?.payload?.data
        })
        builder.addCase(logoutUser.fulfilled,(state,action)=>{
            localStorage.clear()
            state.loggedInStatus = false,
            state.userData = {}
        })
        builder.addCase(getProfile.fulfilled,(state,action)=>{
            localStorage.setItem('userData',JSON.stringify(action?.payload?.data))
            state.userData = action?.payload?.data
        })
    }   
})

export default userSlice.reducer