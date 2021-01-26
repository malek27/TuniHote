import React from "react";
import { editPub } from "../../JS/actions/pub";
import { Link } from "react-router-dom";
import { useState} from "react"; //useEffect 
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import {getpubById} from "../../JS/actions/pub"
import "./EditPub.css";

const EditPub = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const dispatch = useDispatch();
  const pub = useSelector((state) => state.pubReducer.pub);
  const id = pub && pub._id;
  const history = useHistory();
  // useEffect(() => {
  //   dispatch(getpubById(pub._id))
  // }, [])
  return (
    <div>
      <div className="row">
        <div className="total">
          <div className="card">
            <div className="adding">
              <div className="adding-snip">
                <input
                  id="tab-2"
                  type="radio"
                  name="tab"
                  className="sign-up"
                  defaultChecked
                />
                <label htmlFor="tab-2" className="tab">
                  Publication
                </label>

                <div className="adding-space">
                  <div className="group">
                    <label htmlFor="user" className="label">
                      Titre
                    </label>
                    <input
                      id="user"
                      type="text"
                      className="input"
                      placeholder="entrer votre Titre"
                      onChange={(e) => setTitre(e.target.value)}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="user" className="label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="bio"
                      rows={3}
                      placeholder="entrer votre Description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="user" className="label">
                      Prix
                    </label>
                    <input
                      id="uuser"
                      type="text"
                      className="input"
                      placeholder="entrer votre Prix"
                      onChange={(e) => setPrix(e.target.value)}
                    />
                  </div>
                  <div className="group">
                    <Link to="/SingelPub">
                      <button
                        type="submit"
                        className="button"
                        defaultValue="register"
                        onClick={() =>
                          dispatch(
                            editPub(
                              id,
                              {
                                titre,
                                description,
                                prix,
                              },
                              history
                            )
                          )
                        }
                      >
                        Save Pub
                      </button>
                    </Link>
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

export default EditPub;
