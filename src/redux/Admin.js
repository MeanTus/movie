import { createSlice } from "@reduxjs/toolkit"

const adminSlice = createSlice({
    name: 'admin',
    initialState: { admin: {}, isAdmin: false },
    reducers: {
        handleLoginAdmin(state, action) {
            state.admin = action.payload;
            state.isAdmin = true;
        },
        handleLogoutAdmin(state) {
            state.isAdmin = false;
        }
    }
})

export default adminSlice
export const adminAction = adminSlice.actions