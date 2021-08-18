import React from 'react'

const WaitingSeat = () => {
    console.log("WAITING SEATS")
    const renderArray = [...Array(96).keys()];
    const renderSeats = () => {
        return renderArray.map((item, index) => {
            return (<div key={index} className={`col-2 col-md-1 mt-2 waiting-seat`}>
                <div className="seats">{""}</div>
            </div>)
        })
    }
    return (
        <div className="booking-waiting">
            <div className="banner">
                <div className="banner-text">PLEASE SELECT SHOWTIMES</div>
            </div>
            <div className="container">
                <div className="row" style={{ marginLeft: "5px" }}>
                    {renderSeats()}
                </div>
            </div>
        </div>
    )
}

export default WaitingSeat
