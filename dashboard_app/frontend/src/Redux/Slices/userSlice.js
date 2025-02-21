import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import toast from 'react-hot-toast'

const initialState = {
    loggedInStatus : JSON.parse(localStorage.getItem('loggedInStatus')) || false,
    userData : JSON.parse(localStorage.getItem('userData')) || {},
    users : JSON.parse(localStorage.getItem('users')) || []
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
export const getUsers = createAsyncThunk('/user/getusers',async(_,{rejectWithValue})=>{
    try{
        const promise = axios.get('/api/admin/allusers')
        toast.promise(promise,{
            loading : "Fetching users details",
            success : (res)=>res?.data?.message,
            error : (err)=>err?.response?.data?.message
        })
        return (await promise).data
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})

export const editName = createAsyncThunk('/user/editname', async ({ userId, name }, { rejectWithValue }) => {
    try {
        const promise = axios.patch(`/api/users/editname/${userId}`, { name });
        toast.promise(promise, {
            loading: "Updating name",
            success: (res) => res?.data?.message,
            error: (err) => err?.response?.data?.message
        });
        return (await promise).data;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const sendOTP = createAsyncThunk('/user/sendotp',async(_,{rejectWithValue})=>{
    try{
        const promise = axios.post('/api/users/sendotp')
        toast.promise(promise,{
            loading : "Sending OTP",
            success : (res)=>res?.data?.message,
            error : (err)=>err?.response?.data?.message
        })
        return (await promise).data
    }
    catch(err){
        return rejectWithValue(err.message)
    }
})

export const deleteAccount = createAsyncThunk('/users/deleteaccount', async ({ userId, otp }, { rejectWithValue }) => {
    try {
        const promise = axios.post(`/api/users/deleteaccount/${userId}`, { otp });
        toast.promise(promise, {
            loading: "Verifying OTP",
            success: (res) => res?.data?.message,
            error: (err) => err?.response?.data?.message
        });
        return (await promise).data;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

export const sendResetLink = createAsyncThunk('/user/sendresetlink',async(email,{rejectWithValue})=>{
    try{
        const promise = axios.post('/api/users/forgetpassword',{email})
        toast.promise(promise,{
            loading : "Sending reset link",
            success : (res)=>res?.data?.message,
            error : (err)=>err?.response?.data?.message
        })
        return (await promise).data
    }   
    catch(err){
        return rejectWithValue(err.message)
    }
})

export const resetPassword = createAsyncThunk('/users/resetpassword',async({_id,jwtToken,password,confirmPassword},{rejectWithValue})=>{
    try{
        const promise = axios.post(`/api/users/resetpassword/${_id}/${jwtToken}`,{password,confirmPassword})
        toast.promise(promise,{
            loading : "Reseting password",
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
        builder.addCase(getUsers.fulfilled,(state,action)=>{
            localStorage.setItem('users',JSON.stringify(action?.payload?.data))
            state.users = action?.payload?.data
        })
        builder.addCase(editName.fulfilled, (state, action) => {
            if (action?.payload?.success) {
                state.userData = { ...state.userData, name: action.payload.data.name };
                localStorage.setItem('userData', JSON.stringify(state.userData));
            }
        })
        builder.addCase(deleteAccount.fulfilled, (state, action) => {
            localStorage.clear(); 
            state.loggedInStatus = false;
            state.userData = {};
        });        
    }   
})

export default userSlice.reducer