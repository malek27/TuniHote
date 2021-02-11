import React from "react";
import { Spinner } from "react-bootstrap";
import Pub from "../Pub/Pub";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMypubs } from "../../JS/actions/pub";
import "./Mypubs.css"

const Mypubs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMypubs())
    }, [dispatch])

  const loadpub = useSelector((state) => state.pubReducer.loadpub);
  const mypubs = useSelector((state) => state.pubReducer.mypubs);



  return  ( <div>
    <h1>Mes publications</h1>
    <ul className="cards">
      {loadpub ? (
        <Spinner className="spinner" animation="border" variant="primary" />
      ) : ((mypubs) === null || (mypubs.length === 0)) ? 
      (<h3>Pas de publications !!</h3>)
       :(
        mypubs.map((el) => <Pub key={el._id} pub={el} />)
      )}
    </ul>
    </div>
  ) 
};

export default Mypubs;
