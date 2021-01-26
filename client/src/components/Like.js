import React, { useState } from "react";
// import { UidContext } from "../components/AppContext";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
import { useDispatch,useSelector} from "react-redux";
import { likePost, unlikePost } from "../JS/actions/pub";

const LikeButton = ({ pub,user}) => {
  const likes = useSelector((state) => state.pubReducer.likes);
  const userId=user&&user._id;
  
  const [liked, setLiked] = useState(false);
  // const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(pub._id, userId))
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(pub._id, userId))
    setLiked(false);
  };

  return (
    <div className="like-container">
     
      {liked === false && (
        <img src="../img/icons/heart.svg" onClick={like} alt="like" />
      )}
      {liked && (
        <img src="../img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
      )}
      <span>{likes.length && likes.length}</span>
    </div>
  );
};

export default LikeButton;
