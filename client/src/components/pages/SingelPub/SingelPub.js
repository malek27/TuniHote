import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addReservation, getcoms, getpubById,deletePubById } from "../../../JS/actions/pub";
import CardComments from "../../Commentaire/CardComments";
import LikeButton from "../../Like";
import "./SingelPub.css";
import Com from "../../Commentaire/Com";
const SingelPub = ({ match, user }) => {
  const [showComments, setShowComments] = useState(false);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const dispatch = useDispatch();
  const pub = useSelector((state) => state.pubReducer.pub);




  const postedBy = useSelector((state) => state.pubReducer.pub.postedBy);
  const comments = useSelector((state) => state.pubReducer.pub.comments);

  let same = postedBy === user._id
  
 

  useEffect(
    () => dispatch(getcoms(match.params.id)),

    [dispatch,match.params.id]
  );
  useEffect(() => {
    dispatch(getpubById(match.params.id));
  }, [dispatch, match.params.id]);

  const handleReserve = (e) => {
    e.preventDefault();
    if (dateDebut&& dateFin) {
      dispatch(addReservation(pub._id, dateDebut, dateFin));
      setDateDebut("")
      setDateFin("")
    }
   else alert("you should enter the date")
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
                <span>{comments && comments.length}</span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="form">
          <h4>vous pouvez reserever par ici : </h4>
          <form >
          <Col>
              <Form.Control
                type="date"
                placeholder="date debut "
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="date"
                placeholder="date fin"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
              />
            </Col>

            <button className="reserv" variant="primary" onClick={handleReserve}>
              Reserver
            </button>
          </form>
        </div>
        <br />
        <br /> 
        {same &&
           (<Link to="/EditPub">
            <Button className="Bedit" variant="primary" >Edit Pub</Button>
          </Link>)  }
          <br/>
          {same && 
          (<Link to="/mypubs">
            <Button className="Bedit" variant="primary" onClick={()=>dispatch(deletePubById(pub._id))}>Suprimer Pub</Button>
          </Link>) } 
        {showComments && (
          <div className="comment-form">
            <CardComments pub={pub && pub} />
            <Com />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingelPub;
