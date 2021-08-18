import React from 'react'

export const ItemOrder = ({ ticket }) => {
    return (
        <div className="row w-100">
            <div className="item d-flex">
                <div>{ticket.tenGhe}</div>
                <div>{ticket.giaVe}đ</div>
            </div>
        </div>

    )
}
