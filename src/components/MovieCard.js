import React from 'react'
import { FaPlay } from "react-icons/fa"
import { useHistory } from 'react-router'

const MovieCard = ({ movie }) => {
    const history = useHistory();
    const handleClick = () => {
        history.push({
            pathname: `/details/${movie.maPhim}`,
        })
    }
    return (
        <div className="movie-card" onClick={handleClick}>
            <img
                src={movie?.hinhAnh}
                className="card-img-top"
                alt="..."
            />
            <div className="card-body">
                <h5 className="card-title">{movie?.tenPhim}</h5>
                {/* <a href="true"><FaPlay /></a> */}
            </div>
        </div>

    )
}

export default MovieCard
