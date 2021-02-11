import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { addComment} from "../../JS/actions/pub";

import "./Card.css";

const CardComments = ({ pub}) => {
  const dispatch = useDispatch();


  const [text, setText] = useState("");


  const handleComment = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(addComment(pub._id, text));
      setText("")
    }
  };


  return (
    <form action="" onSubmit={handleComment} className="comment-form">
        <input
        className="message"
          type="text"
          name="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Laisser un commentaire"
        />
        <br />
        <input type="submit" value="Envoyer" />
      </form>
  );
};

export default CardComments;