import React from "react";
import { Spinner } from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux"
import {useEffect} from "react"
import { Link} from "react-router-dom";
import { deletePubById,getpubById, getpubs } from "../JS/actions/pub";
const ListePub = () => {
  const dispatch = useDispatch()
//   const history=useHistory()
  useEffect(() => {
    dispatch(getpubs())
  }, [dispatch])
  // const pub = useSelector((state) => state.pubReducer.pub);
  const pubs = useSelector((state) => state.pubReducer.pubs);
  const loadpub = useSelector((state) => state.pubReducer.loadpub);
  // const id = pub._id;
  return (
    <div className="userL">
      {loadpub && loadpub ? (
        <Spinner animation="border" variant="primary" />
      ) : pubs === null || pubs.length === 0 ? (
        <h2>Nothing to show !!</h2>
      ) : (
        pubs && pubs.map((pub) =>  <div key={pub._id}> <h5>{pub.titre}</h5>
        <h6>{pub.prix} Dt</h6>
        <p> {pub.region}</p>
        <div className="col-md-2">
             <Link to ={`/EditPub/${pub._id}`} > <input
                type="submit"
                className="pub-edit-btn"
                name="btnAddMore"
                value="Edit"
                onClick={() => dispatch(getpubById(pub._id))}
              /></Link>
              <Link to="/ListePub"><input
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

