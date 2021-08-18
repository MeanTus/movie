import React from 'react'
import { Route, Redirect } from 'react-router'
import { useSelector } from 'react-redux'

const HomeProtectedRoute = ({ component: Component, ...rest }) => {
    const isLogin = useSelector(state => state.ui.isLogin);
    return (
        <Route {...rest} render={props => (
            isLogin ? <Component {...props} /> : <Redirect to="/" />
        )} />
    )
}

export default HomeProtectedRoute
