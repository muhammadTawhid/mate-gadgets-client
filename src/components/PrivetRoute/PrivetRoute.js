import React, { useContext } from 'react';
import { loginContext } from '../../App';
import Login from '../Login/Login';

const PrivetRoute = ({ children, ...rest }) => {
    const [loggedInUser] = useContext(loginContext)
    return (
        loggedInUser.email ? children : <Login to="/login" />
    );
};

export default PrivetRoute;