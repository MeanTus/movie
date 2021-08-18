import axios from 'axios';
import React, { useRef } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { adminAction } from '../redux/Admin';

const LoginAdmin = () => {
    const dispatch = useDispatch()
    const adminInput = useRef("")
    const passInput = useRef("")
    
    const history = useHistory();
    const handleLogin = (e) => {
        e.preventDefault();
        const body = {
            "taiKhoan": adminInput.current.value,
            "matKhau": passInput.current.value
        }
        axios({
            method: "post",
            url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
            data: body,
        })
            .then((res) => {
                if (res.data.maLoaiNguoiDung === "QuanTri"){
                    dispatch(adminAction.handleLoginAdmin({ ...res.data, "matKhau": passInput.current.value }))
                    history.push({
                        pathname: `/admin`,
                    })
                }
                else {
                    Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Bạn không có quyền truy cập trang này !',
                  })} 
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return(
        <div className="LoginAdmin">
            <div className="Form">
                <div className="avatar"></div>
                <form>
                    <input type="text" placeholder="AdminName" ref={adminInput} />
                    <input type="password" placeholder="Password" ref={passInput} />
                    <input type="submit" value="Submit" onClick={handleLogin} />
                </form>    
            </div>
        </div>
    )
}

export default LoginAdmin