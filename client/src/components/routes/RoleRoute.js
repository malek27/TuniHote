import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import isAuth from "./PrivateRoute"
const RoleRoute = ({component:Component, ...rest}) => {
const Role = localStorage.getItem("role","maison d'hôte") ;
if(isAuth && Role){
  return  <Route  component={Component} {...rest} />
}
    return <Redirect path="/Home" />
}

export default RoleRoute
