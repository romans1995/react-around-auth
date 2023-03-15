import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = ({ children, loggedIn, ...props }) => {
  return loggedIn ?(
    <Route {...props}>
    {  children }
  </Route>
       )
    :(<Redirect to={"/signin"} />)

}

export default ProtectedRoute; 