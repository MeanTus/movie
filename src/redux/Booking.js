import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const bookingSeats = createAsyncThunk('booking/seats', async (params, { dispatch }) => {
    const result = await axios.get(`https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${params}`)
    return result.data
})
const initialState = {
    listShows: [], listBrands: [], listTheaters: [], listDates: [], listTimes: [],
    code: null, listTickets: [], totalPrice: 0
}
const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        getListShow(state, action) {
            state.listShows = action.payload;
        },
        getListBrands(state) {
            const list = state.listShows;
            const systemList = [...new Set(list.map(item => item.thongTinRap.maHeThongRap))]
            const result = systemList.map(item => {
                return {
                    'value': item,
                    'label': item,
                }
            })
            state.listBrands = result;
        },
        getListTheaters(state, action) {
            const list = state.listShows;
            if (action.payload !== null) {
                const theaterList = [...new Set(list.filter(item => item.thongTinRap.maHeThongRap === action.payload.value).map(item => item.thongTinRap.tenCumRap))]
                const result = theaterList.map(item => {
                    return {
                        'value': item,
                        'label': item,
                    }
                })
                state.listTheaters = result;
            }
            else {
                state.listTheaters = []
            }
        },
        getListDates(state, action) {
            const list = state.listShows;
            if (action.payload !== null) {
                const dateList = [...new Set(list.filter(item => item.thongTinRap.tenCumRap === action.payload.value).map(item => item.ngayChieuGioChieu))]
                const array = [...new Set(dateList.map(item => item.split('T')[0]))]
                const result = array.map(item => {
                    return {
                        'value': item.split("-").reverse().join("-"),
                        'label': item.split("-").reverse().join("-"),
                    }
                })
                state.listDates = result;
            }
            else {
                state.listDates = []
            }
        },
        getListTimes(state, action) {
            if (action.payload.item !== null) {
                const { item, theater } = action.payload;
                const checkValue = item.value.split("-").reverse().join("-")
                const list = state.listShows;
                const dateList = [...new Set(list.filter(item => item.thongTinRap.tenCumRap === theater.value).map(item => item.ngayChieuGioChieu))]
                const timeList = dateList.map(item => item.split("T"))
                const result = timeList.filter(item => item[0] === checkValue).map(item => {
                    return {
                        'value': item[1],
                        'label': item[1],
                    }
                })
                state.listTimes = result
            }
            else {
                state.listTimes = []
            }
        },
        getCodeMovie(state, action) {
            const { theater, date, time } = action.payload;
            const list = state.listShows;
            const filterTheater = list.filter(item => item.thongTinRap.tenCumRap === theater.value).map(item => {
                return {
                    "code": item.maLichChieu,
                    "date": item.ngayChieuGioChieu.split("T")[0],
                    "time": item.ngayChieuGioChieu.split("T")[1]
                }
            })
            const checkValue = date.value.split("-").reverse().join("-")
            const code = filterTheater.filter(item => item.date === checkValue && item.time === time.value)[0].code
            state.code = code;
        },
        getDetailsBooking(state, action) {
            const item = action.payload;
            const currentArray = state.listTickets;
            const existingItem = currentArray.filter(ticket => ticket.maGhe === item.maGhe)
            if (existingItem.length !== 0) {
                state.listTickets = state.listTickets.filter(movie => movie.maGhe !== item.maGhe);
                state.totalPrice -= item.giaVe;
            }
            else {
                state.listTickets.push(item);
                state.totalPrice += item.giaVe;
            }
        },
        removeDetailsBooking(state) {
            state.listTickets = [];
            state.totalPrice = 0;
        }
    },
    extraReducers: {
        [bookingSeats.pending]: (state) => {
            state.waitingSeats = true;
        },
        [bookingSeats.fulfilled]: (state, action) => {
            state.waitingSeats = false;
            state.listSeats = { "danhSachGhe": action.payload.danhSachGhe, "maLichChieu": action.payload.thongTinPhim.maLichChieu };
        }
    }
})

export default bookingSlice
export const bookingActions = bookingSlice.actions