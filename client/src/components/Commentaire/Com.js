import React from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Com.css";
const Com = () => {
  const comments = useSelector((state) => state.pubReducer.comments);
  const loadcoms = useSelector((state) => state.pubReducer.loadcoms);
  return (
    <div>
      {loadcoms ? (
        <Spinner animation="border" variant="primary" />
      ) : comments === null || comments.length === 0 ? (
        <h2>Pas de commentaires !!</h2>
      ) : (
        comments.map((comment) => (
        
            <div className="com">
              <div className="col-md-8" key={comment._id}>
                <div className="media g-mb-30 media-comment">
                <img
                    className="d-flex g-width-10 g-height-50 rounded-circle g-mt-3 g-mr-15"
                    src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                    alt="avatar"
                  />
                  <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                 
                    <div className="g-mb-15">
                      <h5 className="h5 g-color-gray-dark-v1 mb-0">
                       
                        {comment.text}
                      </h5>
                      <span className="g-color-gray-dark-v4 g-font-size-12">
                      {comment.user && comment.user["prenom"]}{" "}
                        {comment.user && comment.user["nom"]}
                      </span>
                    </div>
                    <p>{comment.date}</p>
                  </div>
                </div>
              </div>
            </div>
        ))
      )}
    </div>
  );
};

export default Com;
