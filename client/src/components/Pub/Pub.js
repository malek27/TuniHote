import { Button } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import { getpubById } from "../../JS/actions/pub";
import "./Pub.css";
import { useDispatch } from "react-redux";

const Pub = ({ pub }) => {
  const dispatch = useDispatch();
  const id = pub._id;
  return (
    <div className="all">
      <div className="content-wrapper">
        <div className="news-card">
          <img src={pub.imageUrl} alt="" className="news-card__image" />
          <div className="news-card__text-wrapper">
            <h2 className="news-card__title">{pub.titre}</h2>
            <div className="news-card__post-date">{pub.date}</div>
            {/* <div className="news-card__post-poster"> posted by : {userId.nom}</div> */}
            <div className="news-card__details-wrapper">
              <h3 className="news-card__prix">{pub.prix}</h3>
              <Link to={`/SingelPub/${id}`}>
                <Button
                  variant="primary"
                  onClick={() => dispatch(getpubById(id))}
                >
                  More Details...
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pub;
