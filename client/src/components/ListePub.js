import React from "react";
import { Spinner } from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux"
import {useEffect} from "react"
import { Link} from "react-router-dom";
import { deletePubById, getpubs } from "../JS/actions/pub";
const ListePub = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getpubs())
  }, [dispatch])

  const pubs = useSelector((state) => state.pubReducer.pubs);
  const loadpub = useSelector((state) => state.pubReducer.loadpub);

  return (
    <div className="userL">
      {loadpub && loadpub ? (
        <Spinner animation="border" variant="primary" />
      ) : pubs === null || pubs.length === 0 ? (
        <h2>Pas de publications !!</h2>
      ) : (
        pubs && pubs.map((pub) =>  <div key={pub._id}> <h5>{pub.titre}</h5>
        <h6>{pub.prix} Dt</h6>
        <p> {pub.region}</p>
        <div className="col-md-2">
              <Link to="/Home"><input
                type="submit"
                className="pub-delete-btn"
                name="btnAddMore"
                value="Supprimer"
                onClick={() => dispatch(deletePubById(pub._id))}
              />
              </Link>
            </div> </div> )
      )}
    </div>
  );
};

export default ListePub;

