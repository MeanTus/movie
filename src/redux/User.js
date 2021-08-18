import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk('users/getUser', async () => {
    const result = await axios.get('https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01')
    return result.data
})

const userSlice = createSlice({
    name: 'users',
    initialState: { loading: false, listUser: [], },
    reducers: {},
    extraReducers: {
        [getUser.pending]: (state) => {
            state.loading = true;
        },
        [getUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.listUser = action.payload;
        },
    }
})

export default userSlice
export const userActions = userSlice.actions