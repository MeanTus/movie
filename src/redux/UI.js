import { createSlice } from "@reduxjs/toolkit"

const uiSlice = createSlice({
    name: 'ui',
    initialState: { 
        modalStatus: false, 
        isLogin: false, 
        user: {}, 
        userStatus : false,
        adminModal: false },
    reducers: {
        handleModal(state) {
            state.modalStatus = !state.modalStatus
        },
        handleUser(state) {
            state.userStatus = !state.userStatus
        },
        handleLogin(state, action) {
            state.isLogin = true;
            state.user = action.payload;
        },
        handleLogout(state){
            state.isLogin = false;
            state.user = {}
        },
        handleLoginAdmin(state){
            state.adminModal = !state.adminModal;
        }
    }
})

export default uiSlice
export const uiActions = uiSlice.actions