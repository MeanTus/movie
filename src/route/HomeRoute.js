import React, { Fragment } from 'react';
import Navbar from '../components/Navbar';
import { Route } from 'react-router-dom';
import { Footer1 } from '../components/Footer1'

const HomeLayout = ({ children }) => (
    <Fragment>
        <Navbar />
        {children}
        <Footer1 />
    </Fragment>
);

const HomeLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            <HomeLayout>
                <Component {...props} />
            </HomeLayout>
        )} />
    )
};

export default HomeLayoutRoute;