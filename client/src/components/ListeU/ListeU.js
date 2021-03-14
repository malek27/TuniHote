import React from 'react'
import { Spinner } from "react-bootstrap";
import {useDispatch} from "react-redux"
import {useEffect} from "react"
import {getusers} from "../../JS/actions/user"
import { Link } from "react-router-dom";
import {deleteUserById} from "../../JS/actions/user"
import "./ListeU.css"


  

const ListeU = ({users,loadUser}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getusers())
  }, [dispatch])
    return (<div>
      {loadUser && loadUser ? (
        <Spinner animation="border" variant="primary" />
      ) : users === null || users.length === 0 ? (
        <h2>Pas d'utilisateurs!!</h2>
      ) : (
        users && users.map((user) => 
        <div  key={user._id} className="login-container">
        <div  className="profil-img" />
        <h2>
        {user.prenom}  {user.nom}
        </h2>
        <div className="description">
        <h6>{user.role}</h6>
        <p>Email :{user.email}</p>
        <p>CIN :{user.cin}</p>
        <p>Numero :{user.numero}</p>
        </div>
        <div className="social">
        <Link to="/Home"><input
        type="submit"
        className="user-delete-btn"
        name="btnAddMore"
        value="Supprimer"
        onClick={() => dispatch(deleteUserById(user._id))}
      />
      </Link>
        </div>
        </div>))}
      </div>
    )
}

export default ListeU
