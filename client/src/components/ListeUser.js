import React from "react";
import { Spinner } from "react-bootstrap";
import {useDispatch} from "react-redux"
import {useEffect} from "react"
import {getusers} from "../JS/actions/user"
import { Link } from "react-router-dom";
import {deleteUserById} from "../JS/actions/user"
const ListeUser = ({users,loadUser}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getusers())
  }, [dispatch])

  return (
    <div className="userL">
      {loadUser && loadUser ? (
        <Spinner animation="border" variant="primary" />
      ) : users === null || users.length === 0 ? (
        <h2>Pas d'utilisateurs!!</h2>
      ) : (
        users && users.map((user) =>  <div key={user._id}> <h5>{user.prenom}  {user.nom}</h5>
        <h6>{user.role}</h6>
        <p> {user.email}</p>
        <p> {user.cin}</p>
        <p> {user.numero}</p>
        <div className="col-md-2">
              <Link to="/Home"><input
                type="submit"
                className="user-delete-btn"
                name="btnAddMore"
                value="Supprimer"
                onClick={() => dispatch(deleteUserById(user._id))}
              />
              </Link>
            </div> </div> )
      )}
    </div>
  );
};

export default ListeUser;

