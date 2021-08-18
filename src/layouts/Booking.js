import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import usePrevious from "./../hooks/usePrevious"
import { bookingActions } from '../redux/Booking';
import Select from 'react-select';
import BookingSeats from "./../components/BookingSeats.js";
import WaitingSeat from '../components/WaitingSeat';
import { ItemOrder } from '../components/ItemOrder';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { IoMdArrowRoundBack } from "react-icons/io"
import Swal from 'sweetalert2';
const OrderButton = withStyles((theme) => ({
    root: {
        color: "white",
        fontWeight: "bolder",
        backgroundColor: "#FF6300",
        '&:hover': {
            backgroundColor: "red",
        },
    },
}))(Button);
const SelectItem = ({ value, collection, handleChange }) => {
    return (
        <Select
            className="basic-single"
            classNamePrefix="select"
            value={value}
            isClearable={true}
            name="color"
            options={collection}
            theme={theme => ({
                ...theme,
                borderRadius: '5px',
                colors: {
                    ...theme.colors,
                    primary25: 'red',
                    primary: 'black',
                },
            })}
            onChange={handleChange}
        />
    )
}
const BookingDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const codeMovie = history.location.pathname.split("/")[2];
    const [brand, setBrand] = useState("");
    const [theater, setTheater] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const prevBrand = usePrevious(brand);
    const prevTheater = usePrevious(theater);
    const prevDate = usePrevious(date);
    // const prevTime = usePrevious(time);
    useEffect(() => {
        dispatch(bookingActions.getListBrands())
    }, [dispatch])
    useEffect(() => {
        if (brand === null) {
            setTheater(null)
        }
        if (theater === null) {
            setDate(null)
        }
        if (date === null) {
            setTime(null)
        }
        if (brand !== "" && theater !== "" && date !== "" && time !== "" && brand !== null && theater !== null && date !== null && time !== null) {
            dispatch(bookingActions.getCodeMovie({
                "theater": theater,
                "date": date,
                "time": time
            }));
        }
    }, [dispatch, brand, theater, date, time])

    //Get data from store
    const option_brands = useSelector(state => state.booking.listBrands);
    const option_theaters = useSelector(state => state.booking.listTheaters);
    const option_dates = useSelector(state => state.booking.listDates);
    const option_times = useSelector(state => state.booking.listTimes);
    const movieCode = useSelector(state => state.booking.code);
    const { listTickets } = useSelector(state => state.booking)
    const { totalPrice } = useSelector(state => state.booking)
    const { user } = useSelector(state => state.ui)
    const arr = listTickets.map(item => (
        { "maGhe": item.maGhe, "giaVe": item.giaVe }
    ));
    const styleArrow = {
        "width": "25px",
        "height": "50px",
        "color": "#FFF",
        "marginLeft": "10px",
        "cursor": "pointer",
    }
    const handleChangeBrands = (e) => {
        setBrand(e);
        if (e !== brand) {
            if (prevBrand !== "") {
                setTheater(null)
            }
            dispatch(bookingActions.getListTheaters(e))
        }
    }
    const handleChangeTheaters = (e) => {
        setTheater(e);
        if (e !== theater) {
            if (prevTheater !== "") {
                setDate(null)
            }
            dispatch(bookingActions.getListDates(e))
        }
    }
    const handleChangeDates = (e) => {
        setDate(e);
        if (e !== date) {
            if (prevDate !== "") {
                setTime(null)
            }
            dispatch(bookingActions.getListTimes({ "item": e, "theater": theater }))
        }
    }
    const handleChangeTimes = (e) => {
        setTime(e);
    }

    const handleOrder = (e) => {
        const body = {
            "maLichChieu": movieCode,
            "danhSachVe": e,
            "taiKhoanNguoiDung": user.taiKhoan
        }
        axios({
            method: "post",
            url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
            data: body,
            headers: {
                Authorization: 'Bearer ' + user.accessToken
            }
        }).then((res) => {
            Swal.fire({
                icon: 'success',
                title: 'Đặt vé thành công !',
                confirmButtonText: 'OK',

            }).then((res) => {
                if (res.isConfirmed) {
                    dispatch(bookingActions.removeDetailsBooking())
                    history.push("/");
                }
            })
        })
            .catch((err) => {
                console.log(err.response)
            })
    }
    return (
        <div className="booking-details">
            <IoMdArrowRoundBack style={styleArrow} onClick={() => { history.replace(`/details/${codeMovie}`) }} />
            <div className="booking-selection">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <SelectItem value={brand} collection={option_brands} handleChange={handleChangeBrands} />
                        </div>
                        <div className="col-6">
                            <SelectItem value={theater} collection={option_theaters} handleChange={handleChangeTheaters} />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <SelectItem value={date} collection={option_dates} handleChange={handleChangeDates} />
                        </div>
                        <div className="col-6">
                            <SelectItem value={time} collection={option_times} handleChange={handleChangeTimes} />
                        </div>
                    </div>
                </div>
            </div>
            {movieCode ? <BookingSeats code={movieCode} /> : <WaitingSeat />}
            <div className="booking-ordering container mt-5 ">
                <div className="row">
                    <div className="col-12 col-md-5 text-center">
                        <div className="row justify-content-around mb-5" style={{ fontWeight: "bold" }}>
                            <div className="col-5" style={{ color: 'red' }}>
                                Total:
                            </div>
                            <div className="col-5" style={{ color: 'red' }}>
                                {totalPrice}đ
                            </div>
                        </div>
                    </div>
                    <div className="order-tickets col-12 col-md-7 ">
                        <div className="have-scroll float-end" style={{ width: "100%" }}>
                            {listTickets.map((ticket) => (
                                <ItemOrder ticket={ticket} />
                            ))}
                        </div>
                    </div>
                    <div className="order-button text-center mt-4">
                        <OrderButton variant="contained" color="primary" onClick={() => { handleOrder(arr) }}>
                            Đặt vé
                        </OrderButton>
                    </div>
                </div>
            </div>
            <div className="w-100" style={{ height: "30px" }}></div>
        </div>
    )
}

export default BookingDetails
