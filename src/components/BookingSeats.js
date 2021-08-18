import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bookingSeats, bookingActions } from '../redux/Booking'
import Spinner from "./../components/Spinner"
const BookingSeats = ({ code }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(bookingSeats(code))
    }, [dispatch, code])
    const { listSeats, waitingSeats, listTickets } = useSelector(state => state.booking);
    const arrayCheck = listTickets.map(item => item.maGhe);
    const handleBook = (item) => {
        const { maGhe, giaVe, user, tenGhe } = item;
        const data = {
            "maGhe": maGhe,
            "giaVe": giaVe,
            'tenGhe': tenGhe,
        }
        if (user === null) {
            dispatch(bookingActions.getDetailsBooking(data))
        }
    }
    const renderSeats = () => {
        return listSeats && listSeats.danhSachGhe.slice(0, 96).map(item => {
            let classSeat = "";
            if (item.taiKhoanNguoiDat === null) {
                if (arrayCheck.includes(item.maGhe)) {
                    classSeat = "select-seat"
                }
                else {
                    classSeat = item.loaiGhe === "Thuong" ? "normal-seat" : "vip-seat"
                }
            }
            else {
                classSeat = "booked-seat"
            }
            return (<div key={item.maGhe} className={`col-2 col-md-1 mt-2 ${classSeat}`}>
                <div className="seats" onClick={() => {
                    handleBook({
                        "maGhe": item.maGhe,
                        "giaVe": item.giaVe,
                        "user": item.taiKhoanNguoiDat,
                        "tenGhe": item.tenGhe
                    })
                }}>{item.tenGhe}</div>
            </div>)
        })
    }
    if (waitingSeats) return <Spinner />
    return (
        <div className="booking-seats mt-2">
            <div className="screen"></div>
            <div className="show-case">
                <ul>
                    <li>
                        <div className="notice" style={{ background: "#f1ce8f" }}></div>
                        <span>Selected</span>
                    </li>
                    <li>
                        <div className="notice" style={{ background: "#fff" }}></div>
                        <span>Normal</span>
                    </li>
                    <li>
                        <div className="notice" style={{ background: "#ff6300" }}></div>
                        <span>Vip</span>
                    </li>
                </ul>
            </div>
            <div className="container">
                <div className="row" style={{ marginLeft: "5px" }}>
                    {renderSeats()}
                </div>
            </div>
        </div>
    )
}

export default BookingSeats
