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

const Test = ({ match, user }) => {

  const [showComments, setShowComments] = useState(false);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const dispatch = useDispatch();
  const pub = useSelector((state) => state.pubReducer.pub);




  const postedBy = useSelector((state) => state.pubReducer.pub.postedBy);
  // const comments = useSelector((state) => state.pubReducer.pub.comments);

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

    return (
        <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="bg-cover bg-center h-56 p-4" style={{backgroundImage: `{pub.imageUrl}`}}>
                <div className="flex justify-end">
                  <svg className="h-6 w-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <p className="uppercase tracking-wide text-sm font-bold text-gray-700">Detached house • 5y old</p>
                <p className="text-3xl text-gray-900">$750,000</p>
                <p className="text-gray-700">742 Evergreen Terrace</p>
              </div>
            </div>
          </div>
        </div></div>
    )
}

export default Test
