import React, { Fragment } from 'react'
import logo from "./../assets/img/logo.svg"
import { useDispatch, useSelector } from 'react-redux'
import ModalForm from '../components/ModalForm'
import DropDown from "../components/DropDown"
import { uiActions } from "./../redux/UI"
import { useHistory } from 'react-router'

const Navbar = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.ui.isLogin)
    const history = useHistory();
    return (
        <Fragment>
            <div className="homepage-navbar">
                <img className="homepage-logo" src={logo} alt="#" style={{ cursor: "pointer" }} onClick={() => { history.push("/") }}></img>
                {
                    isLogin ? <DropDown /> :
                        <Fragment>
                            <button onClick={() => { dispatch(uiActions.handleModal()) }}>Sign In</button>
                            <ModalForm />
                        </Fragment>
                }
            </div>
        </Fragment>
    )
}

export default Navbar
