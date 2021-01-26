import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { getReservasion } from "../JS/actions/pub";
const ReservasionM = () => {
  let reservasions = useSelector((state) => state.pubReducer.reservasions);
  let loadresrvs = useSelector((state) => state.pubReducer.loadresrvs);
  let pub = useSelector((state) => state.pubReducer.pub);
  // let postedBy = useSelector((state) => state.pubReducer.reservasions.pub.postedBy);
  let user = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReservasion());
  }, [dispatch]);

  console.log(loadresrvs);
  console.log(reservasions);
  console.log(pub);
  
  const myReserv = pub.postedBy == user._id   

  return (
    <div>
      <h2>Reservasion</h2>
      {loadresrvs  ? (
        <Spinner animation="border" variant="primary" />
      ) :  myReserv ? ( reservasions.map((reservasion) => ( 
          <div className="reservasion" key={reservasion._id}>
            
            <h5>
              l'utilisateur : {reservasion.user["nom"]} {reservasion.user["prenom"]}  veut reserver : {reservasion.pub.titre} , du {reservasion.dateDebut}  au {reservasion.dateFin}
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

export default ReservasionM;


{/* } */}