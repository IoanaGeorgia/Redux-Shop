import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'authSlice',
    initialState:{
        values:{
            username:"",
            password:""
        },
        isAuthenticated: false,
    },
    reducers:{
        checkAuth: (state) =>{
           console.log(state.values.username, "this is from authslice");
        
        },
        setAuthVals:(state, payload) =>{
            state.values.username = payload.payload.username
            state.values.password = payload.payload.password
        }
    }
})

export const {checkAuth, setAuthVals} = authSlice.actions

export const isAuthenticated = (state) => state.authSlice.isAuthenticated;
export const authGlobalVals = (state) => state.authSlice.values

export default authSlice.reducer;