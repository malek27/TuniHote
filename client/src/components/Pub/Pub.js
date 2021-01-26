// import { Button } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import { getpubById } from "../../JS/actions/pub";
import "./Pub.css";
import { useDispatch } from "react-redux";

const Pub = ({ pub }) => {
  const dispatch = useDispatch();
  const id = pub._id;
  return (
    <li className="cards__item">
      <div className="card">
        <div className="card__image" >
          <img src={pub.imageUrl} alt=""  />
        </div>
        <div className="card__content">
          <div className="card__title">{pub.titre}</div>
          <br/>
          <p className="card__text">{pub.date} </p>
          <p className="card__text">{pub.prix} Dt/jour </p>
          <p className="card__text">{pub.region} </p>
          <Link to={`/SingelPub/${id}`} >
          <button
            className="btn btn--block card__btn"
            onClick={() => dispatch(getpubById(id))}
          >
            More details
          </button>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default Pub;
