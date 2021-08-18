import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { uiActions } from '../redux/UI';
import { getUser } from '../redux/User';

export const UserManage = ({ filterList, admin, page, handleChangePage }) => {
    const dispatch = useDispatch()
    let renderList = [];

    if (page === 1) {
        renderList = filterList.slice(0, 10)
    }
    else {
        renderList = filterList.slice(10 * (page - 1) + 1, 10 * page)
    }

    const handleIconClick = () => {
        dispatch(uiActions.handleLoginAdmin())
    }
    const handleDelete = (user) => {
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
                    "TaiKhoan": user,
                }
                axios({
                    method: "delete",
                    url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`,
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
        })
    }
    return (
        <div>
            <div className="home-content">
                <div className="sales-boxes">
                    <div className="recent-sales box">
                        <div className="title">Danh sách người dùng
                            <AddBoxIcon onClick={handleIconClick}
                                style={{ color: 'green', marginLeft: '10px', cursor: "pointer" }} />
                        </div>
                        <div className="sales-details" style={{ width: "100%", overflowX: "scroll" }}>
                            <ul className="details">
                                <li className="topic">Tên</li>
                                {renderList.map((user, index) => {
                                    return (<p key={index}>
                                        <DeleteIcon
                                            style={{ color: 'red', marginLeft: '-20px', cursor: "pointer" }}
                                            onClick={() => { handleDelete(user.taiKhoan) }} />
                                        {user.hoTen}
                                    </p>)
                                })}
                            </ul>
                            <ul className="details">
                                <li className="topic">Tài khoản</li>
                                {renderList.map((user, index) => {
                                    return (<p key={index}>{user.taiKhoan}</p>)
                                })}
                            </ul>
                            <ul className="details">
                                <li className="topic">Mật khẩu</li>
                                {renderList.map((user, index) => {
                                    return (<p key={index}>{user.matKhau ? user.matKhau : "null"}</p>)
                                })}
                            </ul>
                            <ul className="details">
                                <li className="topic">Email</li>
                                {renderList.map((user, index) => {
                                    return (<p key={index}>{user.email}</p>)
                                })}
                            </ul>
                            <ul className="details">
                                <li className="topic">SĐT</li>
                                {renderList.map((user, index) => {
                                    return (<p key={index}>{user.soDt}</p>)
                                })}
                            </ul>
                            <ul className="details">
                                <li className="topic">Loại người dùng</li>
                                {renderList.map((user, index) => {
                                    return (<p key={index}>{user.maLoaiNguoiDung}</p>)
                                })}
                            </ul>
                        </div>
                        {renderList.length === 0 ? <div style={{ textAlign: "center " }}>Data not found...!</div> : null}
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
    )
}
