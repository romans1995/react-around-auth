import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = ({ children,ischeckToken, isLoggedIn, ...props }) => {
  const isRenderSpinner = ischeckToken // true
  return(isRenderSpinner?isLoggedIn ?(
    <Route path="/around-react" {...props}>
    {  children }
  </Route>
       )
    :(<Redirect to={"/signin"} />):(<p className='protectedRoute__loadingSpinner'>Loading...</p>));

}

export default ProtectedRoute; 