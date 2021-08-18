import React, { useState, useEffect } from 'react'
import { Loading } from "./../components/Loading.js"
import TrailerForm from '../components/TrailerForm';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetails } from "./../redux/MovieDetail"
import { uiActions } from '../redux/UI';
import { Redirect } from 'react-router';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const BookingButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "red",
        '&:hover': {
            backgroundColor: "red",
            fontWeight: "bolder",
        },
    },
}))(Button);
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(0),
    },
}));
const MovieDetail = (props) => {
    const id = props.match.params.idMovie;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMovieDetails(id))
    }, [dispatch, id])
    const { loading, details } = useSelector(state => state.details)
    const time = new Date(details.ngayKhoiChieu).toLocaleDateString("vi-VN");
    const isLogin = useSelector(state => state.ui.isLogin);
    const [open, setOpen] = useState(false);
    const [booking, setBooking] = useState(false);
    const classes = useStyles();
    const openTrailer = () => {
        setOpen(true)
    }
    const handleBooking = () => {
        setBooking(true)
        if (!isLogin) {
            dispatch(uiActions.handleModal())
        }
    }
    if (isLogin && booking) return <Redirect to={`/booking/${id}`} />
    if (loading) return <Loading />
    return (
        <div className="detailMovie" >
            <div className="detail-bg"></div>
            <div className="detail-contents">
                <div className="content-card">
                    <div className="card-img" onClick={openTrailer}>
                        <img src={details.hinhAnh} alt="movie-img"></img>
                    </div>
                    <div className="card-text">
                        <h6>{time}</h6>
                        <h4>{details.tenPhim}</h4>
                        <BookingButton variant="contained" color="primary" className={classes.margin} onClick={handleBooking}>
                            Booking
                        </BookingButton>
                    </div>
                    <div className="card-circle" style={{ opacity: "0" }}>
                        <svg>
                            <circle cx="70" cy="70" r="70"></circle>
                            <circle cx="70" cy="70" r="70" style={{ strokeDashoffset: details.danhGia ? 440 - (44 * details.danhGia) : 0 }}></circle>
                        </svg>
                        <div className="circle-percent">
                            <h2>{details.danhGia}.0</h2>
                        </div>
                    </div>
                </div>
            </div>
            <TrailerForm url={details.trailer} open={open} setOpen={() => { setOpen(false) }} />
        </div>
    )
}

export default MovieDetail
