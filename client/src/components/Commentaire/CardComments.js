import React, { useState,useEffect } from "react";
import { useDispatch,useSelector} from "react-redux";
import { addComment, getcoms,getpubById} from "../../JS/actions/pub";
import { Spinner } from "react-bootstrap";
// import { timestampParser } from "../Utils";
// import EditDeleteComment from "./EditDeleteComment";
import "./Card.css";

const CardComments = ({ pub, user }) => {

const dispatch = useDispatch();
  // const userId = user && user._id;

  const [text, setText] = useState("");
   
  useEffect(() => {
    dispatch(getcoms())
   }, [dispatch])
const comments = useSelector(state => state.pubReducer.comments)
const loadcoms = useSelector(state => state.pubReducer.loadcoms)
console.log(comments)
  const handleComment = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(addComment(pub._id, text));
    }
  };
 

  const moment = require("moment");

  return (
    <div className="comments-container">
      {loadcoms ? (
        <Spinner animation="border" variant="primary" />)
        : ( comments&&comments.map((comment) => {
        return (
          <div
            className=""
              // comment.user._id === user.id
              //   ? "comment-container client"
              //   : "comment-container"
            
            key={comment._id} 
          > 
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>
                    {comment.user.prenom} {comment.user.nom}
                  </h3>
                </div>
                <span>{moment().format("llll")}</span>
              </div>
              <p>{comment.text}</p>
              {/* <EditDeleteComment comment={comment} pub={pub} /> */}
            </div>
           </div>
        );}))}
        
      <form action="" onSubmit={handleComment} className="comment-form">
        <input
          type="text"
          name="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Laisser un commentaire"
        />
        <br />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default CardComments;
