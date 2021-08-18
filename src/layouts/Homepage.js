import React, { useEffect } from 'react'
import { getMovies } from "./../redux/Movie"
import { useDispatch, useSelector } from 'react-redux'
import Button from '@atlaskit/button'
import Textfield from '@atlaskit/textfield'
import bg from "./../assets/img/background.jpg"
import { CarouselMovie } from "./../components/CarouselMovie"
import { Loading } from '../components/Loading'

const Homepage = () => {
    const dispatch = useDispatch();
    const { listMovies, loading } = useSelector(state => state.movie)
    useEffect(() => {
        dispatch(getMovies())
    }, [dispatch])

    if (loading) return <Loading />
    return (
        <div className="homepage">
            <div className="homepage-billboard">
                <img src={bg} alt="#"></img>
                <div className="center-text">
                    <h1>Unlimited movies, TV shows, and more.</h1>
                    <h2>Watch anywhere. Cancel anything</h2>
                    <form>
                        <h3>Ready to watch? Enter your to creat or restart your membership.</h3>
                        <Textfield
                            placeholder="Email Address"
                            css={{ borderStyle: "none" }}
                            elemAfterInput={
                                <Button
                                    appearance="danger"
                                    style={{ height: "100%", borderWidth: "none", borderRadius: "0", borderTopRightRadius: "3px", borderBottomRightRadius: "3px", padding: "8px 10px" }}
                                >
                                    Get Started
                                </Button>
                            }
                        >
                        </Textfield>
                    </form>
                </div>
            </div>
            <CarouselMovie movies={listMovies} />
        </div>
    )
}

export default Homepage
