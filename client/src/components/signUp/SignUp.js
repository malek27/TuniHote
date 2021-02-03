import React from "react";
import "./SignUp.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../JS/actions/user";
import { Link, useHistory } from "react-router-dom";
const SignUp = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [cin, setCin] = useState("");
  const [numero, setNumero] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [role, setRole] = useState("Utilisateur");
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="row">
      <div >
        <div className="carde">
          <div className="login-box">
            <div className="login-snip">
              <input
                id="tab-1"
                type="radio"
                name="tab"
                className="sign-in"
                defaultChecked
              />
              <label htmlFor="tab-1" className="tab">
                Membre
              </label>
              <input id="tab-2" type="radio" name="tab" className="sign-up" />
              <label htmlFor="tab-2" className="tab">
                S'enregistrer
              </label>
              <div className="login-space">
                <div className="login">
                  <div className="group">
                    <label htmlFor="user" className="label">
                      Email
                    </label>
                    <input
                      id="useerr"
                      type="text"
                      className="input"
                      placeholder="Entrer votre email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="pass" className="label">
                      Mot de passe
                    </label>
                    <input
                      id="pass"
                      type="password"
                      className="input"
                      data-type="password"
                      placeholder="Entrer votre mot de passe"
                      onChange={(e) => setMotDePasse(e.target.value)}
                    />
                  </div>
                  <div className="group">
                    <input
                      id="check"
                      type="checkbox"
                      className="check"
                      defaultChecked
                    />
                    <label htmlFor="check">
                      <span className="icon" /> rester connecter
                    </label>
                  </div>
                  <div className="group">
                    <input
                      type="submit"
                      className="button"
                      defaultValue="Sign In"
                      onClick={() =>
                        dispatch(loginUser({ email, motDePasse }, history))
                      }
                    />
                  </div>
                  <div className="hr" />
                  <div className="foot">
                   <Link to="/forget/password">Mot de passe oublier ?</Link>
                  </div>
                </div>
                <div className="sign-up-form">
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
                  </div>
                  <div className="group">
                    <label htmlFor="pass" className="label">
                      Mot de passe
                    </label>
                    <input
                      id="paasss"
                      type="password"
                      className="input"
                      data-type="password"
                      placeholder="Entrer votre Mot de passe"
                      onChange={(e) => setMotDePasse(e.target.value)}
                    />
                  </div>
                  <div className="group">
                    <label className="role" htmlFor="Role">
                      Choisie ton role :
                    </label>
                    <select
                      name="Role"
                      id="Role"
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="Utilisateur">Utilisateur</option>
                      <option value="Maison d'hôte">Maison d'hôte</option>
                    </select>
                  </div>
                  <div className="group">
                    <input
                      type="submit"
                      className="button"
                      defaultValue="Sign Up"
                      onClick={() =>
                        dispatch(
                          registerUser(
                            {
                              nom,
                              prenom,
                              email,
                              adresse,
                              cin,
                              numero,
                              motDePasse,
                              role,
                            },
                            history
                          )
                        )
                      }
                    />
                  </div>
                  <div className="hr" />
                  <div className="foot">
                    <label htmlFor="tab-1">Already Member?</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
