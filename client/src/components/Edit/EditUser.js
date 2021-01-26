import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editUser } from "../../JS/actions/user";
import { Link } from "react-router-dom";
import "./EditUser.css";

const EditUser = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [cin, setCin] = useState("");
  const [numero, setNumero] = useState("");
  const user = useSelector((state) => state.userReducer.user);
  const id = user && user._id;
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="edit">
    
      <div>
        <div>
          <div>
            <div className="groups">
            <h3>Edit user</h3>
            <br/>
            <br/>
              <div className="group">
                <label htmlFor="user" className="label">
                  Nom
                </label>
                <input
                  id="userr"
                  type="text"
                  className="input"
                  placeholder="entrer votre Nom"
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>
              <div className="group">
                <label htmlFor="user" className="label">
                  Prenom
                </label>
                <input
                  id="user"
                  type="text"
                  className="input"
                  placeholder="entrer votre Prenom"
                  onChange={(e) => setPrenom(e.target.value)}
                />
              </div>
              <div className="group">
                <label htmlFor="user" className="label">
                  Email
                </label>
                <input
                  id="useer"
                  type="text"
                  className="input"
                  placeholder="entrer votre Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="group">
                <label htmlFor="user" className="label">
                  Adresse
                </label>
                <input
                  id="uuser"
                  type="text"
                  className="input"
                  placeholder="entrer votre Adresse"
                  onChange={(e) => setAdresse(e.target.value)}
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  cin
                </label>
                <input
                  id="paass"
                  type="text"
                  className="input"
                  placeholder="entrer votre Cin"
                  onChange={(e) => setCin(e.target.value)}
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Numero
                </label>
                <input
                  id="ppass"
                  type="text"
                  className="input"
                  placeholder="entrer votre Numero"
                  onChange={(e) => setNumero(e.target.value)}
                />
                <br/>
                <br/>
                <Link to="/Profile" >
                  <input
                    type="submit"
                    className="button"
                    defaultValue="Sign Up"
                    onClick={() =>
                      dispatch(
                        editUser(id,
                          {
                            nom,
                            prenom,
                            email,
                            adresse,
                            cin,
                            numero,
                          },
                          history
                        )
                      )
                    }
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
