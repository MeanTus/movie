import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bookingActions } from '../redux/Booking.js';
import axios from "axios";

export const getMovieDetails = createAsyncThunk('movieDetails/getMovieDetails', async (params, apiThunk) => {
    const result = await axios.get(`https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${params}`)
    apiThunk.dispatch(bookingActions.getListShow(result.data.lichChieu))
    return result.data
})

const movieDetailsSlice = createSlice({
    name: 'movieDetails',
    initialState: { loading: false, details: {}, },
    reducer: {},
    extraReducers: {
        [getMovieDetails.pending]: (state) => {
            state.loading = true;
        },
        [getMovieDetails.fulfilled]: (state, action) => {
            state.loading = false;
            state.details = action.payload;
        },
    }
})

export default movieDetailsSlice
export const movieDetailsActions = movieDetailsSlice.actions