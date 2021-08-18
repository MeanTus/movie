import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovies = createAsyncThunk('movies/getMovies', async () => {
    const result = await axios.get('https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01')
    return result.data
})

const movieSlice = createSlice({
    name: 'movies',
    initialState: { loading: false, listMovies: [], },
    reducer: {},
    extraReducers: {
        [getMovies.pending]: (state) => {
            state.loading = true;
        },
        [getMovies.fulfilled]: (state, action) => {
            state.loading = false;
            state.listMovies = action.payload;
        },
    }
})

export default movieSlice
export const movieActions = movieSlice.actions