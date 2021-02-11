import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useEffect} from "react";
import { accepterR, declinerR, getReservation } from "../../JS/actions/pub";
import "./Reservation.css"

const ReservationM = () => {
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
 
  // localStorage.getItem('role')==='utilisateur'
  // localStorage.getItem('role')==="maison d'hôte"
  // localStorage.getItem("token")
  

  return (
    <div>
      <h1>Reservation</h1>
      {loadresrvs ? (
        <Spinner animation="border" variant="primary" />
      ) : (localStorage.getItem("token") && localStorage.getItem('role')==="maison d'hôte") ? (
        reservations.map((reservation) => (
          (reservation.pub.postedBy === user._id && reservation.reponse === "en attente") &&
         ( <div className="reservations" key={reservation._id}>
            <h5>
              l'utilisateur : {reservation.user&&reservation.user["nom"]} {reservation.user&&reservation.user["prenom"]} 
              <br/>
              veut reserver : {reservation.pub.titre} , du  {reservation.dateDebut} au {reservation.dateFin}
            </h5>
            <div>
              <button onClick={() => dispatch(accepterR(reservation._id))}>accepter</button>
              <button
                className="decliner ml-1"
                onClick={() =>dispatch(declinerR(reservation._id))}
              >
                decliner
              </button>
              <br/>
              <br/>
            </div>
          </div>)  ))) : 
      (localStorage.getItem("token") && localStorage.getItem('role')==='utilisateur') ? (
        reservations.map((reservation) => (
          <div className="reservation" key={reservation._id}>
            <h5>
              vous avez envoyer une demande de reservation de {reservation.pub.titre} , du  {reservation.dateDebut} au
              {reservation.dateFin}
            </h5>
            <div>
              {(reservation.reponse==="true") ? (
                <h6>reponse : votre demande est accepter </h6>
              ) : (reservation.reponse==="false") ? (
                <h6>
                  reponse : la date est déjà reserver veuillez essayer une autre
                  date !
                </h6>
              ) : (
                <h6>reponse : en attente de reponse </h6>
              )}
            </div>
          </div>
        ))
      ) : (
        <h5> pas de reservations</h5>
      )}
    </div>
  );
};

export default ReservationM;

