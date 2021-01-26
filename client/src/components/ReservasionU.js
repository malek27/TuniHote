import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { getReservasion } from "../JS/actions/pub";
const ReservationU = () => {
  let reservasions = useSelector((state) => state.pubReducer.reservasions);
  let loadresrvs = useSelector((state) => state.pubReducer.loadresrvs);
  let pub = useSelector((state) => state.pubReducer.pub);
  let user = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReservasion());
  }, [dispatch]);

  console.log(loadresrvs);
  console.log(reservasions);
  console.log(pub);
  
  const myReserv = reservasions.user === user._id

  return (
    <div>
      <h2>Reservasion</h2>
      {loadresrvs  ? (
        <Spinner animation="border" variant="primary" />
      ) : myReserv ? ( reservasions.map((reservasion) => ( 
          <div className="reservasion" key={reservasion._id}>
            
            <h5>
          vous avez envoyer une demande de reservasion de {reservasion.pub.titre} , du {reservasion.dateDebut}  au {reservasion.dateFin}
            </h5>
            <div>
            <h5>reponse : </h5>
            </div>
          </div>
        ))
      ): <h4>no reservasion</h4>}
    </div>
  );
};

export default ReservationU;
