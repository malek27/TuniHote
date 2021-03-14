import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useEffect} from "react";
import {getReservation } from "../../JS/actions/pub";
import "./Reservation.css"
const ReservationA = () => {

    let reservations = useSelector((state) => state.pubReducer.reservations);
    let loadresrvs = useSelector((state) => state.pubReducer.loadresrvs);
    // let pub = useSelector((state) => state.pubReducer.pub);
    let user = useSelector((state) => state.userReducer.user);
   
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getReservation());
    }, [dispatch]);

    return (
        <div>
            <h1>Reservation</h1>
      {loadresrvs ? (
        <Spinner animation="border" variant="primary" />
      ) : (localStorage.getItem("token") && localStorage.getItem('role')==="maison d'hôte") ? (
        reservations.map((reservation) => ( 
          (reservation.pub.postedBy === user._id && reservation.reponse === "true") &&
         ( <div className="reservations" key={reservation._id}>
            <h5>
              l'utilisateur : {reservation.user["nom"]} {reservation.user["prenom"]} 
              <br/>
              a reserver : {reservation.pub.titre} , du  {reservation.dateDebut} au {reservation.dateFin}
            </h5>
            {/* <div>
              <button onClick={() => dispatch(accepterR(reservation._id))}>accepter</button>
              <button
                className="decliner ml-1"
                onClick={() =>dispatch(declinerR(reservation._id))}
              >
                decliner
              </button>
              <br/>
              <br/>
            </div> */}
          </div>)  ))): (
        <h5> pas de reservations</h5>
      )}
        </div>
    )
}

export default ReservationA
