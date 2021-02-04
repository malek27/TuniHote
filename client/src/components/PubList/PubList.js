import React from "react";
import { Spinner } from "react-bootstrap";
import Pub from "../Pub/Pub";
import { useSelector } from "react-redux";

import "./PubList.css";
const PubList = () => {
  const loadpub = useSelector((state) => state.pubReducer.loadpub);
  const pubs = useSelector((state) => state.pubReducer.pubs);

  return (
    <ul className="cardss">
      {loadpub ? (
        <Spinner className="spinner" animation="border" variant="primary" />
      ) : (pubs&&pubs) === null  ? (
        <h2>Pas de publications!!</h2>
      ) : (
        pubs&&pubs.map((el) => <Pub key={el._id} pub={el} />)
      )}
    </ul>
  );
};

export default PubList;
