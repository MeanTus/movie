import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React, { Fragment, useRef, useState } from 'react';
import { AiFillGithub, AiFillGooglePlusCircle, FaFacebook } from "react-icons/all";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import useInput from '../hooks/useInput';
import { uiActions } from "../redux/UI";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '315px',
        height: '405px',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        borderRadius: '15px',
        boxShadow: theme.shadows[1],
        padding: '50px 35px 0px 35px ',
    },
    sub_paper: {
        width: '315px',
        height: '345px',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        borderRadius: '15px',
        boxShadow: theme.shadows[1],
        padding: '75px 35px 0px 35px ',
    }
}));
const Login = () => {
    const userInput = useRef("");
    const passInput = useRef("");
    const dispatch = useDispatch();
    const handleLogin = (e) => {
        e.preventDefault();
        const body = {
            "taiKhoan": userInput.current.value,
            "matKhau": passInput.current.value
        }
        axios({
            method: "post",
            url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
            data: body,
        })
            .then((res) => {
                dispatch(uiActions.handleModal())
                dispatch(uiActions.handleLogin({ ...res.data, "matKhau": passInput.current.value }))
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: err.response.data,
                })
            })
    }
    return (
        <div className="main-box">
            <form>
                <input type="text" placeholder="Username" ref={userInput} />
                <input type="password" placeholder="Password" ref={passInput} />
                <input type="submit" value="Submit" onClick={handleLogin} />
            </form>
        </div>
    )
}
const Register = (props) => {
    const [error, setError] = useState('')
    const [re_password, setRePassword] = useState('')
    const password = useRef("")
    const dispatch = useDispatch();
    const {
        value: enteredUser,
        error: userError,
        validValue: userValid,
        valueChangeHandler: userChangeHandler,
        touchedHandler: userTouchedHandler
    } = useInput(value => value.trim() !== '');
    const {
        value: enteredEmail,
        error: emailError,
        validValue: emailValid,
        valueChangeHandler: emailChangeHandler,
        touchedHandler: emailTouchedHandler
    } = useInput(value => value.includes('@'))
    const passwordValid = (password.current.value === re_password)
    let formValid = (userValid && emailValid && passwordValid) ? false : true;
    const handleRePassword = (e) => {
        setRePassword(e.target.value)
    }
    const handleRegister = (e) => {
        e.preventDefault()
        const body = {
            "taiKhoan": enteredUser,
            "matKhau": password.current.value,
            "email": enteredEmail,
            "soDt": "",
            "maNhom": "GP01",
            "maLoaiNguoiDung": "KhachHang",
            "hoTen": ""
        }
        axios({
            method: "post",
            url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
            data: body
        })
            .then((res) => {
                dispatch(uiActions.handleModal())
                Swal.fire({
                    icon: 'success',
                    title: 'Oops...',
                    confirmButtonText: 'OK'
                }).then((res) => {
                    if (res.isConfirmed) {
                        dispatch(uiActions.handleModal())
                        props.swap()
                    }
                })
            })
            .catch((err) => { setError(err.response.data) })
    }

    return (
        <div className="main-box">
            <form>
                {error && <div className="form-error"><p>{error}</p></div>}
                <input type="text" placeholder="Username"
                    value={enteredUser}
                    onChange={userChangeHandler}
                    onBlur={userTouchedHandler}
                />
                {userError && <p className="text-error">Username can't be empty</p>}

                <input type="text" placeholder="Email"
                    value={enteredEmail}
                    onChange={emailChangeHandler}
                    onBlur={emailTouchedHandler}
                />
                {emailError && <p className="text-error">Invalid email format</p>}

                <input type="password" placeholder="Password" autoComplete="current-password"
                    ref={password}
                />
                <input type="password" placeholder="Re-password" autoComplete="current-password"
                    value={re_password}
                    onChange={handleRePassword}
                />
                <input type="submit" value="Submit" onClick={handleRegister} disabled={formValid} />
            </form>
        </div>
    )
}

const ModalForm = () => {
    const classes = useStyles();
    const [regis, setRegis] = useState(true);
    const dispatch = useDispatch()
    const status = useSelector(state => state.ui.modalStatus)
    return (
        <Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={status}
                onClose={() => { dispatch(uiActions.handleModal()) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={status}>
                    <div className={regis ? classes.sub_paper : classes.paper}>
                        <div className="box">
                            <div className="content">
                                {regis ? <Login /> : <Register swap={() => { setRegis((prev) => !prev) }} />}
                                <div className="division">
                                    <div className="line-l"></div>
                                    <span>OR</span>
                                    <div className="line-r"></div>
                                </div>
                                <div className="social-box">
                                    <FaFacebook fill="#3B5998" />
                                    <AiFillGooglePlusCircle fill="#D44638" />
                                    <AiFillGithub />
                                </div>
                                <div className="text-box">
                                    {
                                        regis
                                            ?
                                            <p>Don't have an account ? <span onClick={() => { setRegis((prev) => !prev) }} style={{ fontWeight: "bold" }}>SIGN UP</span></p>
                                            :
                                            <p>Already have an account ? <span onClick={() => { setRegis((prev) => !prev) }} style={{ fontWeight: "bold" }}>SIGN IN</span></p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </Fragment>
    )
}

export default ModalForm
