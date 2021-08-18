import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMovies } from '../redux/Movie';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Swal from 'sweetalert2';
import Pagination from '@material-ui/lab/Pagination';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns'
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers'
export const MovieManage = ({ filterList, admin, page, handleChangePage }) => {
    const dispatch = useDispatch();
    const [url, setUrl] = useState("")
    const [update, setUpdate] = useState(false)
    const [filmUpdate, setFilmUpdate] = useState([])
    const [inputFile, setInputFile] = useState("");
    const [addMovie, setAddMovie] = useState(false)
    const [datePicker, setDatePicker] = useState("");
    let renderArray = []

    // Các state để update film
    const newTenPhim = useRef("")
    const newNgayChieu = useRef("")
    const newTrailer = useRef("")

    // Các state thêm film
    const addTenPhim = useRef("")
    const addNgayChieu = useRef("")
    const addTrailer = useRef("")

    if (update) {
        renderArray = filmUpdate;
    }
    else {
        if (page === 1) {
            renderArray = filterList.slice(0, 10)
        }
        else {
            renderArray = filterList.slice(10 * (page - 1) + 1, 10 * page)
        }
    }
    const handleRemoveUpdate = () => {
        setUpdate(!update)
        setFilmUpdate([])
    }
    const imageHandle = (e) => {
        e.preventDefault()
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setInputFile(e.target.files[0])
                setUrl(e.target.files[0].name)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const updateFilm = (movie) => {
        setUpdate(!update)
        const flag = [];
        flag.push(movie)
        setDatePicker(movie.ngayKhoiChieu)
        setFilmUpdate(flag)
    }

    const handleUpdateFilm = async (e) => {
        let file = "";
        //IF DON'T CHANGE IMAGE
        if (url === "") {
            let response = await fetch(`${e.hinhAnh}`);
            let data = await response.blob();
            let metadata = {
                type: 'image/jpeg'
            };
            file = new File([data], "current.jpg", metadata);
        }

        const body = {
            "maPhim": e.maPhim,
            "tenPhim": newTenPhim.current.value,
            "biDanh": e.biDanh,
            "trailer": newTrailer.current.value,
            "hinhAnh": file !== "" ? file.name : url,
            "moTa": e.moTa,
            "maNhom": "GP01",
            "ngayKhoiChieu": newNgayChieu.current.value,
            "danhGia": 10
        }
        //Call axios
        const config = {
            method: "post",
            url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhim`,
            data: body,
            headers: {
                Authorization: 'Bearer ' + admin.accessToken
            }
        }
        const result = await axios(config).then((res) => { return res }).catch((err) => { return err.response })
        // console.log(result)
        var frm = new FormData();
        frm.append('File', file !== "" ? file : inputFile, result.data.hinhAnh);
        frm.append('tenphim', result.data.tenPhim)
        frm.append('manhom', 'GP01')
        const config2 = {
            method: "post",
            url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/UploadHinhAnhPhim`,
            data: frm,
            headers: {
                Authorization: 'Bearer ' + admin.accessToken
            }
        }
        axios(config2).then((res) => {
            Swal.fire({
                title: 'Update phim thành công !',
                icon: 'success',
            })
            setUpdate(!update)
            setFilmUpdate([])
            dispatch(getMovies())
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: err.response.data,
            })
        })
    }

    const handleDeleteMovie = (movie) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const body = {
                    "MaPhim": movie,
                }
                // console.log(admin.accessToken)
                // console.log(body)
                axios({
                    method: "delete",
                    url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${movie}`,
                    data: body,
                    headers: {
                        Authorization: 'Bearer ' + admin.accessToken
                    }
                })
                    .then((res) => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        dispatch(getMovies())
                    })
                    .catch(err => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops..',
                            text: err.response.data,
                        })
                    })
            }
        })
    }


    const handleDatePicker = (e) => {
        setDatePicker(e);
    }
    const AddMovie = () => {
        setAddMovie(!addMovie)
    }
    const handleAddMovie = async (e) => {
        const body = {
            "maPhim": 0,
            "tenPhim": addTenPhim.current.value,
            "biDanh": addTenPhim.current.value,
            "trailer": addTrailer.current.value,
            "hinhAnh": url,
            "moTa": "Đây là mô tả phim",
            "maNhom": "GP01",
            "ngayKhoiChieu": addNgayChieu.current.value,
            "danhGia": 10
        }
        const config = {
            method: "post",
            url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhim`,
            data: body,
            headers: {
                Authorization: 'Bearer ' + admin.accessToken
            }
        }
        const result = await axios(config).then((res) => { return res }).catch((err) => { return err.response })

        var frm = new FormData();
        frm.append('File', inputFile, result.data.hinhAnh);
        frm.append('tenphim', result.data.tenPhim)
        frm.append('manhom', 'GP01')
        const config2 = {
            method: "post",
            url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh`,
            data: frm,
            headers: {
                Authorization: 'Bearer ' + admin.accessToken
            }
        }
        axios(config2).then((res) => {
            Swal.fire(
                'Added',
                'Thêm phim thành công',
                'success'
            )
            setAddMovie(!addMovie)
            dispatch(getMovies());
        })
            .catch((err) => { console.log(err) })
    }
    return (
        <div>
            <div className="home-content">
                <div className="sales-boxes">
                    <div className="recent-sales box">
                        <div className="title">
                            Danh sách phim
                            {update ? null : <AddBoxIcon onClick={AddMovie}
                                style={{ color: 'green', marginLeft: '10px', cursor: "pointer" }} />}
                        </div>
                        <div className="container">
                            {addMovie && <div className="mb-5 d-flex mt-3" style={{ alignItems: "center" }}>
                                <TextField
                                    id="standard-basic"
                                    placeholder={"Nhập tên phim"}
                                    className="col-lg-auto me-5"
                                    inputRef={addTenPhim}
                                />
                                <TextField
                                    id="standard-basic"
                                    placeholder={"Nhập ngày chiếu"}
                                    className="col-lg-auto me-5"
                                    inputRef={addNgayChieu}
                                />
                                <TextField
                                    id="standard-basic"
                                    placeholder={"Nhập Trailer"}
                                    className="col-lg-auto me-5"
                                    inputRef={addTrailer}
                                />
                                <div className="col-lg-auto">
                                    <input type="file"
                                        name="image-upload"
                                        accept="image/*"
                                        onChange={imageHandle} />
                                </div>
                                <CheckCircleRoundedIcon
                                    style={{ marginRight: '10px', color: 'green', cursor: "pointer" }}
                                    onClick={() => { handleAddMovie() }} />
                            </div>}
                            {renderArray.slice(0, 10).map((movie, index) => {
                                return (
                                    <div className="mb-3" key={index}>
                                        <div className="row">
                                            {update ?
                                                <div className="col-lg-auto">
                                                    <div style={{ marginLeft: '-80px' }}>
                                                        <CheckIcon
                                                            style={{ marginTop: "20px", marginRight: '10px', color: 'green', cursor: "pointer" }}
                                                            onClick={() => { handleUpdateFilm(movie) }} />
                                                        <ClearIcon
                                                            style={{ marginTop: "20px", marginRight: '10px', color: 'red', cursor: "pointer" }}
                                                            onClick={handleRemoveUpdate}
                                                        />
                                                        <TextField
                                                            id="standard-basic"
                                                            label="Tên phim"
                                                            defaultValue={movie.tenPhim}
                                                            className="col-lg-auto"
                                                            inputRef={newTenPhim}
                                                        />
                                                    </div>
                                                </div>
                                                :
                                                <div className="col-lg-2">
                                                    <div style={{ marginLeft: '-40px' }}>
                                                        <CreateIcon
                                                            onClick={() => updateFilm(movie)} style={{ cursor: "pointer" }} />
                                                        <DeleteIcon
                                                            style={{ marginRight: '10px', color: 'red', cursor: "pointer" }}
                                                            onClick={() => { handleDeleteMovie(movie.maPhim) }} />
                                                        {movie.tenPhim}
                                                    </div>
                                                </div>
                                            }

                                            {update ?
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                        id="date-picker-inline"
                                                        disableToolbar
                                                        label="Ngày khởi chiếu"
                                                        format="dd/MM/yyyy"
                                                        value={datePicker}
                                                        className="col-lg-2"
                                                        onChange={handleDatePicker}
                                                        inputRef={newNgayChieu}
                                                        style={{ marginRight: "10px" }}
                                                    />
                                                </MuiPickersUtilsProvider>
                                                :
                                                <div className="col-lg-2">{new Date(movie.ngayKhoiChieu).toLocaleDateString("vi-VN")}</div>
                                            }

                                            {update ?
                                                <TextField
                                                    id="standard-basic"
                                                    defaultValue={movie.trailer}
                                                    label="Trailer"
                                                    className="col-lg-2"
                                                    inputRef={newTrailer}
                                                />
                                                :
                                                <div className="col-lg-5">{movie.trailer}</div>
                                            }

                                            {update ?
                                                <div className="col-lg-2" style={{ marginTop: "18px" }}>
                                                    <input type="file"
                                                        name="image-upload"
                                                        accept="image/*"
                                                        onChange={imageHandle} />
                                                </div>
                                                :
                                                <div className="col-lg-2">
                                                    <img src={movie.hinhAnh}
                                                        style={{ width: '100px', height: '100px' }}
                                                    ></img>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )
                            })}
                            <Pagination
                                count={Math.round(filterList.length / 10)}
                                color="primary"
                                page={page}
                                onChange={handleChangePage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
