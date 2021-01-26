import React from "react";
import { Spinner } from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux"
import {useEffect} from "react"
import {getusers} from "../JS/actions/user"
import { Link } from "react-router-dom";
import {deleteUserById} from "../JS/actions/user"
import { editUser } from "../JS/actions/user";
const ListeUser = ({users,loadUser}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getusers())
  }, [dispatch])
  const user = useSelector((state) => state.userReducer.user);
  const id = user._id;
  return (
    <div className="userL">
      {loadUser && loadUser ? (
        <Spinner animation="border" variant="primary" />
      ) : users === null || users.length === 0 ? (
        <h2>Nothing to show !!</h2>
      ) : (
        users && users.map((user) =>  <div key={user._id}> <h5>{user.prenom}  {user.nom}</h5>
        <h6>{user.role}</h6>
        <p> {user.email}</p>
        <p> {user.cin}</p>
        <p> {user.numero}</p>
        <div className="col-md-2">
             <Link to="/EditUser"> <input
                type="submit"
                className="user-edit-btn"
                name="btnAddMore"
                value="Edit"
                onClick={() => dispatch(editUser(id))}
              /></Link>
              <Link to="/ListUser"><input
                type="submit"
                className="user-delete-btn"
                name="btnAddMore"
                value="Supprimer"
                onClick={() => dispatch(deleteUserById(id))}
              />
              </Link>
            </div> </div> )
      )}
    </div>
  );
};

export default ListeUser;

