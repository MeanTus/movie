import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../redux/UI'
import UserForm from './UserForm'

const DropDown = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.ui.user)
    return (
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{marginRight:"0"}}>
                Welcome {user.hoTen ? user.hoTen : null}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ width: "100%" }}>
                <li class="dropdown-item" onClick={() => { dispatch(uiActions.handleUser()) }} style={{ cursor: "pointer" }}>User</li>
                <li class="dropdown-item" onClick={() => { dispatch(uiActions.handleLogout()) }} style={{ cursor: "pointer" }}>Log out</li>
                <UserForm user={user} />
            </ul>
        </div>
    )
}

export default DropDown