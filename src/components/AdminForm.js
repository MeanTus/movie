import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { adminAction } from '../redux/Admin';
import { getMovies } from '../redux/Movie';
import { uiActions } from '../redux/UI';
import { getUser } from '../redux/User';
import { Loading } from './Loading';
import { MovieManage } from './MovieManage';
import { UserManage } from './UserManage';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        borderRadius: '5px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export const AdminForm = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)
    const classes = useStyles();
    const [movieManage, setMovieManage] = useState(false)
    const { admin } = useSelector(state => state.admin)
    const { listUser, loading } = useSelector(state => state.user)
    const { listMovies } = useSelector(state => state.movie)
    const [search, setSearch] = useState("")
    const { adminModal } = useSelector(state => state.ui)
    const filterList = movieManage ?
        listMovies.filter(item => item.tenPhim.toLowerCase().includes(search.toLowerCase()))
        :
        listUser.filter(item => item.hoTen.toLowerCase().includes(search.toLowerCase()));
    const resultList = filterList.filter((v, i, a) => a.findIndex(t => (t.tenPhim === v.tenPhim)) === i)

    useEffect(() => {
        dispatch(getUser())
        dispatch(getMovies())
    }, [dispatch])

    const handleSearch = (e) => {
        e.preventDefault()
        setSearch(e.target.value);
        setPage(1);
    }

    const AddPerson = () => {
        const taiKhoan = useRef("")
        const matKhau = useRef("")
        const email = useRef("")
        const soDT = useRef("")
        const hoTen = useRef("")

        const handleAdd = (e) => {
            e.preventDefault();

            const body = {
                "taiKhoan": taiKhoan.current.value,
                "matKhau": matKhau.current.value,
                "email": email.current.value,
                "soDt": soDT.current.value,
                "maNhom": "GP01",
                "maLoaiNguoiDung": "QuanTri",
                "hoTen": hoTen.current.value
            }
            axios({
                method: "post",
                url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
                data: body,
                headers: {
                    Authorization: 'Bearer ' + admin.accessToken
                }
            })
                .then((res) => {
                    Swal.fire(
                        'Added!',
                        'Thêm thành công',
                        'success'
                    )
                    dispatch(getUser())
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops..',
                        text: err.response.data,
                    })
                })
        }
        return (
            <div className="AddPerson">
                <h3>Thêm người dùng</h3>
                <form onSubmit={handleAdd}>
                    <input type="text" placeholder="Tài khoản..." ref={taiKhoan}></input>
                    <input type="text" placeholder="Mật khẩu..." ref={matKhau}></input>
                    <input type="text" placeholder="Email..." ref={email}></input>
                    <input type="text" placeholder="Số điện thoại..." ref={soDT}></input>
                    <input type="text" placeholder="Họ tên..." ref={hoTen}></input>
                    <input type="submit" value="Thêm" />
                </form>
            </div>
        )
    }

    const handleUserManage = () => {
        setMovieManage(!movieManage)
    }
    const handleChangePage = (event, value) => {
        setPage(value)
        // console.log(value)
    }
    if (loading) return <Loading />
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={adminModal}
                onClose={() => { dispatch(uiActions.handleLoginAdmin()) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={adminModal}>
                    <div className={classes.paper}>
                        <AddPerson />
                    </div>
                </Fade>
            </Modal>
            <section className="home-section">
                <div className="nav">
                    <div className="search-box">
                        <input type="text" placeholder="Search..."
                            onChange={handleSearch}
                        ></input>
                    </div>
                    <div>
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton2"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Hello {admin.hoTen}
                            </button>
                            <ul
                                className="dropdown-menu dropdown-menu-dark"
                                aria-labelledby="dropdownMenuButton2"
                                style={{
                                    width: "100%",
                                    textAlign: "center"
                                }}
                            >
                                <li>
                                    <div className="dropdown-item" style={{ cursor: "pointer" }} onClick={handleUserManage}>
                                        {movieManage ? "Quản lý User" : "Quản lý phim"}
                                    </div>
                                </li>
                                <li>
                                    <div className="dropdown-item" style={{ cursor: "pointer" }}
                                        onClick={() => { dispatch(adminAction.handleLogoutAdmin()) }}
                                    >
                                        Log out
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {movieManage ?
                    <MovieManage filterList={resultList} admin={admin} page={page} handleChangePage={handleChangePage} />
                    :
                    <UserManage filterList={filterList} admin={admin} page={page} handleChangePage={handleChangePage} />}
            </section>
        </div>
    )
}