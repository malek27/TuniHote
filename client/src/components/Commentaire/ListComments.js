import React from "react";
import { Spinner } from "react-bootstrap";
import Comments from "./Comments"


const ListComment = ({comments,loadcoms}) => {

  return (
    <div className="pub">
      {loadcoms ? (
        <Spinner animation="border" variant="primary" />
      ) : comments === null || comments.length === 0 ? (
        <h2>Nothing to show !!</h2>
      ) : (
        comments.map((el) => <Comments key={el._id} comment={el}   />)
      )}
    </div>
  );
};

export default ListComment;
