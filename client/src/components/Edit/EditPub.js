import React from "react";
import { editPub } from "../../JS/actions/pub";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react"; //
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {getpubById} from "../../JS/actions/pub"
import "./EditPub.css";

const EditPub = () => {
  const pub = useSelector((state) => state.pubReducer.pub);
  const id = pub && pub._id;

  const [titre, setTitre] = useState(pub.titre);
  const [description, setDescription] = useState(pub.description);
  const [prix, setPrix] = useState(pub.prix);
 
 
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getpubById(pub._id))
  }, [dispatch,pub._id])
  return (
    
              <div className="edit-pub">
                <h3>
                  Publication
                </h3>

                <div className="ediit">
                  <div className="group">
                    <label htmlFor="user" className="label">
                      Titre
                    </label>
                    <input
                      id="user"
                      type="text"
                      className="input"
                      value={titre}
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
                      value={description}
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
                      value={prix}
                      onChange={(e) => setPrix(e.target.value)}
                    />
                  </div>
                  <div className="group">
                    <Link to={`/SingelPub/${pub._id}`}>
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
  );
};

export default EditPub;
