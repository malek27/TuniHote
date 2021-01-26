import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { getReservation } from "../JS/actions/pub";
const ReservationU = () => {
  let reservations = useSelector((state) => state.pubReducer.reservations);
  let loadresrvs = useSelector((state) => state.pubReducer.loadresrvs);
  let pub = useSelector((state) => state.pubReducer.pub);
  let user = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReservation());
  }, [dispatch]);

  console.log(loadresrvs);
  console.log(reservations);
  console.log(pub);
  
  const myReserv = reservations.user === user._id

  return (
    <div>
      <h2>Reservation</h2>
      {loadresrvs  ? (
        <Spinner animation="border" variant="primary" />
      ) : myReserv ? ( reservations.map((reservation) => ( 
          <div className="reservation" key={reservation._id}>
            
            <h5>
          vous avez envoyer une demande de reservation de {reservation.pub.titre} , du {reservation.dateDebut}  au {reservation.dateFin}
            </h5>
            <div>
            <h5>reponse : </h5>
            </div>
          </div>
        ))
      ): <h4>pas de reservations</h4>}
    </div>
  );
};

export default ReservationU;
