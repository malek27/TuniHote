import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addReservation, getcoms, getpubById } from "../../JS/actions/pub";
import CardComments from "../Commentaire/CardComments";
import ListComments from "../Commentaire/ListComments";

import LikeButton from "../Like";
import "./SingelPub.css";
const SingelPub = ({ match, user }) => {
  const [showComments, setShowComments] = useState(false);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const dispatch = useDispatch();
  const pub = useSelector((state) => state.pubReducer.pub);

  const loadcoms = useSelector((state) => state.pubReducer.loadcoms);
  const comments = useSelector((state) => state.pubReducer.pub.comments);
  const postedBy = useSelector((state) => state.pubReducer.pub.postedBy);
  let same = postedBy === user._id

  // const userId = user && user._id;
  useEffect(
    () => dispatch(getcoms()),

    [dispatch]
  );
  useEffect(() => {
    dispatch(getpubById(match.params.id));
  }, [dispatch, match.params.id]);

  const handleReserve = (e) => {
    e.preventDefault();
    if ({ dateDebut, dateFin }) {
      dispatch(addReservation(pub._id, dateDebut, dateFin));
    }
  };

  console.log(pub);

  return (
    <div>
      <div>
        <div className="containe">
          
            <img className="images" src={pub.imageUrl} alt="imageURL" />
          
          <div className="product">
            <p>Mise le : {pub.date}</p>
            <h2>{pub.titre}</h2>
            <h5>prix : {pub.prix}</h5>
            <p className="desc">Description : {pub.description}</p>
            <div className="buttons">
             <div  className="likeC"><LikeButton pub={pub && pub} user={user && user} /></div> 
              
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="../img/icons/message1.svg"
                  alt="comment"
                />
                <span>{comments.length && comments.length}</span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="form">
          <h4>vous pouvez reserever par ici : </h4>
          <Form>
            <Col>
              <Form.Control
                type="date"
                placeholder="date debut "
                onChange={(e) => setDateDebut(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="date"
                placeholder="date fin"
                onChange={(e) => setDateFin(e.target.value)}
              />
            </Col>

            <Button className="reserv" variant="primary" onSubmit={handleReserve}>
              Reserver
            </Button>
          </Form>
        </div>
        <br />
        <br /> 
        {same &&
          (  <Link to="/EditPub">
            <Button className="ediit" variant="primary">Edit Pub</Button>
          </Link>  ) }  
        {showComments && (
          <div className="comment-form">
            <CardComments pub={pub && pub} />
            <ListComments comments={comments} loadcoms={loadcoms} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingelPub;
