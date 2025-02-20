import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loggedInStatus : JSON.parse(localStorage.getItem('loggedInStatus')) || false,
    userData : JSON.parse(localStorage.getItem('userData')) || {}
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{

    }
})

export default userSlice.reducer