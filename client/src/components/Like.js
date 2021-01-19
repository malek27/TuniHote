import React, {useEffect, useState } from "react";
// import { UidContext } from "../components/AppContext";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
import { useDispatch} from "react-redux";
import { addLike, removeLike } from "../JS/actions/pub";

const LikeButton = ({ pub,user}) => {
  // const user = useSelector(state => state.userReducer.user);
  // const userId=user&&user._id;
  
  const [liked, setLiked] = useState(false);
  // const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(addLike(pub.id, user.id))
    setLiked(true);
  };

  const unlike = () => {
    dispatch(removeLike(pub.id, user.id))
    setLiked(false);
  };

  useEffect(() => {
    if (pub.likes.includes(user.id)) setLiked(true); 
    else setLiked(false);
  }, [user.id, pub.likes, liked]);

  return (
    <div className="like-container">
      {/* {user._id === null && (
        <div
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer une pub !</div>
        </div>
      )} */}
      {liked === false && (
        <img src="../../../public/img/icons/heart.svg" onClick={like} alt="like" />
      )}
      {liked && (
        <img src="../../../public/img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
      )}
      <span>{pub.likes.length}</span>
    </div>
  );
};

export default LikeButton;
