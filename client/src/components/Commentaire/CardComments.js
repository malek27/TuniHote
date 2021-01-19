import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { addComment, getpubById } from "../../JS/actions/pub";
import { timestampParser } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";
import "./Card.css";
const CardComments = ({ pub, user }) => {
 
  const userId = user && user._id;
  const userNom = user && user.nom;
  const userPrenom = user && user.prenom;

  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(userId, text, userNom, userPrenom))
        .then(() => dispatch(getpubById()))
        .then(() => setText(""));
    }
  };

  return (
    <div className="comments-container">
      {pub.comments.map((comment) => {
        return (
          <div
            className={
              comment.userId === userId
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>
                    {comment.userPrenom}  
                    {comment.userNom}
                  </h3>
                </div>
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} pub={pub} />
            </div>
          </div>
        );
      })}
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
