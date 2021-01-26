import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { getReservation } from "../JS/actions/pub";
const ReservationM = () => {
  let reservations = useSelector((state) => state.pubReducer.reservations);
  let loadresrvs = useSelector((state) => state.pubReducer.loadresrvs);
  let pub = useSelector((state) => state.pubReducer.pub);
  // let postedBy = useSelector((state) => state.pubReducer.reservations.pub.postedBy);
  let user = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReservation());
  }, [dispatch]);

  console.log(loadresrvs);
  console.log(reservations);
  console.log(pub);
  
  const myReserv = pub.postedBy == user._id   

  return (
    <div>
      <h2>Reservation</h2>
      {loadresrvs  ? (
        <Spinner animation="border" variant="primary" />
      ) :  myReserv ? ( reservations.map((reservation) => ( 
          <div className="reservations" key={reservation._id}>
            
            <h5>
              l'utilisateur : {reservation.user["nom"]} {reservation.user["prenom"]}  veut reserver : {reservation.pub.titre} , du {reservation.dateDebut}  au {reservation.dateFin}
            </h5>
            <div>
            <button>accepter</button>
            <button className="decliner ml-1">decliner</button>
            </div>
          </div>
        ))
      ):<h2> pas de reservation !!</h2>}
    </div>
  );
};

export default ReservationM;


{/* } */}