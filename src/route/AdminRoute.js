import React from 'react'
import { Route, Redirect } from 'react-router'
import { useSelector } from 'react-redux'

const AdminRoute = ({ component: Component, ...rest }) => {
    const isAdmin = useSelector(state => state.admin.isAdmin);
    return (
        <Route {...rest} render={props => (
            isAdmin ? <Component {...props} /> : <Redirect to="/loginadmin" />
        )} />
    )
}

export default AdminRoute
