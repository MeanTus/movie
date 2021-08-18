import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React, { Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../redux/UI';
import Button from '@material-ui/core/Button';
const SubmitButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "black",
        marginTop: "10px",
        fontWeight: "bolder",
        '&:hover': {
            backgroundColor: "red",
        },
    },
}))(Button);
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '315px',
        height: '345px',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        borderRadius: '15px',
        boxShadow: theme.shadows[1],
        padding: '50px 35px 0px 35px ',
    },
}));

const UserForm = ({ user }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const status = useSelector(state => state.ui.userStatus)

    const newName = useRef("");
    const newSDT = useRef("")

    const handleChangeUser = (e) => {
        e.preventDefault();

        const body = {
            "taiKhoan": user.taiKhoan,
            "matKhau": user.matKhau,
            "email": user.email,
            "soDt": newSDT.current.value,
            "maNhom": user.maNhom,
            "maLoaiNguoiDung": user.maLoaiNguoiDung,
            "hoTen": newName.current.value
        }

        axios({
            method: "put",
            url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
            data: body,
            headers: {
                Authorization: 'Bearer ' + user.accessToken
            }
        })
            .then((res) => {
                dispatch(uiActions.handleUser())
                dispatch(uiActions.handleLogin(res.data))
            })
            .catch(err => console.log(err))
    }
    return (
        <Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={status}
                onClose={() => { dispatch(uiActions.handleUser()) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={status}>
                    <div className={classes.paper}>
                        <div className="box">
                            <form className="content" onSubmit={handleChangeUser}>
                                <TextField
                                    id="standard-basic"
                                    label="Fullname"
                                    defaultValue={user.hoTen ? user.hoTen : " "}
                                    style={{ width: "100%" }}
                                    inputRef={newName} />
                                <TextField
                                    disabled id="standard-disabled"
                                    label="Username"
                                    defaultValue={user.taiKhoan}
                                    style={{ width: "100%", marginTop: "10px" }} />
                                <TextField
                                    disabled id="standard-disabled"
                                    label="Email"
                                    defaultValue={user.email}
                                    style={{ width: "100%", marginTop: "10px" }} />
                                <TextField
                                    id="standard-basic"
                                    label="Phone number"
                                    defaultValue={user.soDT ? user.soDT : " "}
                                    inputRef={newSDT}
                                    style={{ width: "100%", marginTop: "10px" }} />
                                <div className="text-center">
                                    <SubmitButton>Submit</SubmitButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </Fragment>
    )
}

export default UserForm
