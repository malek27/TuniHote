import React from "react";
import "./Utilisateur.css";
import { useSelector,useDispatch } from "react-redux";
import { Link} from "react-router-dom";
import {deleteUserById} from "../../JS/actions/user"



const Utilisateur = () => {
  const user = useSelector((state) => state.userReducer.user);
  const loadUser = useSelector((state) => state.userReducer.loadUser);
  const id = user._id;
  const dispatch = useDispatch();
 
 
  return user ? (
    <div>
      <div className="container emp-profile">
        <form method="post">
          <div className="row" style={{ marginTop: 25 }}>
            <div className="col-md-4">
              <div className="profile-img">
                <img className="profile"
                  src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                  alt="avatar"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{user.prenom}  {user.nom}</h5>
                <h6>{user.role}</h6>

                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    About
                  </a>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
             <Link to="/EditUser"> <input
                type="submit"
                className="profile-edit-btn"
                name="btnAddMore"
                value="Edit Profile"
                // onClick={() => dispatch(getuser(id),history)}
              /></Link>
              <Link to="/Home"><input
                type="submit"
                className="profile-delete-btn"
                name="btnAddMore"
                value="Supprimer"
                onClick={() => dispatch(deleteUserById(id))}
              />
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Nom</label>
                    </div>
                    <div className="col-md-6">
                      <p> {user.nom}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Prenom</label>
                    </div>
                    <div className="col-md-6">
                      <p> {user.prenom}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p> {user.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Numero</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.numero}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Adresse</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.adresse}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>CIN</label>
                    </div>
                    <div className="col-md-6">
                      <p> {user.cin}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    loadUser
  );
  };

export default Utilisateur;
