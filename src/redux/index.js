import { configureStore } from "@reduxjs/toolkit"
import uiSlice from "./UI"
import movieSlice from "./Movie"
import movieDetailsSlice from "./MovieDetail"
import bookingSlice from "./Booking"
import userSlice from "./User"
import adminSlice from "./Admin"

const store = configureStore({
    reducer: { 
        ui: uiSlice.reducer, 
        movie: movieSlice.reducer, 
        details: movieDetailsSlice.reducer, 
        booking: bookingSlice.reducer,
        user: userSlice.reducer,
        admin: adminSlice.reducer }
})

export default store
