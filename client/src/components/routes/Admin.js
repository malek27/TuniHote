import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import isAuth from "./PrivateRoute"
const Admin = ({component:Component, ...rest}) => {
const isAdmin = localStorage.getItem("isAdmin","true") ;
if(isAuth && isAdmin){
  return  <Route  component={Component} {...rest} />
}
    return <Redirect path="/Home" />
}

export default Admin
