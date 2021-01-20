import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getpubById } from "../../JS/actions/pub";
import CardComments from "../Commentaire/CardComments";
import LikeButton from "../Like";
import "./SingelPub.css";
const SingelPub = ({ match, user }) => {
  const [showComments, setShowComments] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const pub = useSelector((state) => state.pubReducer.pub);
  const user = useSelector((state) => state.pubReducer.user);

  useEffect(() => {
    dispatch(getpubById(match.params.id));
  }, [dispatch, match.params.id]);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((pub) => {
          if (pub._id == result._id) {
            return result;
          } else {
            return pub;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((pub) => {
          if (pub._id == result._id) {
            return result;
          } else {
            return pub;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  data.map((pub) => {
    return (
      <div className="singelPub">
        <div className="C">
          <div className="singel" style={{ margin: "2%" }}>
            <img
              className="singelIm"
              variant="top"
              src={pub.imageUrl}
              alt="photos"
            />
            <div>
              <h3>Titre de la publication : {pub.titre}</h3>
              <h5>Description : {pub.description}</h5>
              <h4>prix par jour : {pub.prix}</h4>
              <h6>Mise le : {pub.date}</h6>

              <div className="form">
                <h4>vous pouvez reserever par ici : </h4>
                <Form>
                  <Col>
                    <Form.Control type="date" placeholder="date debut " />
                  </Col>
                  <Col>
                    <Form.Control type="date" placeholder="date fin" />
                  </Col>
                  <Link to="/Home">
                    <Button variant="primary">Reserver</Button>
                  </Link>
                </Form>
              </div>
              <br />
              <br />
              <Link to="/">
                <Button variant="primary">GoBack Home</Button>
              </Link>
              <br />
              <br />
              <Link to="/EditPub">
                <Button variant="primary">Edit Pub</Button>
              </Link>
              <div className="card-footer">
                <div className="comment-icon">
                  <img
                    onClick={() => setShowComments(!showComments)}
                    src="../img/icons/message1.svg"
                    alt="comment"
                  />
                  {/* <span>{pub.comments.length === 0 ? "no comments":pub.comments.length}</span>   */}
                  {/* <span>{pub.comments.length}</span> */}
                </div>
                <div className="card-content">
                  <i className="material-icons" style={{ color: "red" }}>
                    favorite
                  </i>
                  {pub.likes.includes(state._id) ? (
                    <i
                      className="material-icons"
                      onClick={() => {
                        unlikePost(pub._id);
                      }}
                    >
                      thumb_down
                    </i>
                  ) : (
                    <i
                      className="material-icons"
                      onClick={() => {
                        likePost(pub._id);
                      }}
                    >
                      thumb_up
                    </i>
                  )}

                  <h6>{pub.likes.length} likes</h6>
                </div>
              </div>
              {showComments && (
                <CardComments pub={pub && pub} user={user && user} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default SingelPub;
