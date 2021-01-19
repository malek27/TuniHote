import React from "react";
import { Spinner } from "react-bootstrap";
import Utilisateur from "../components/utilisateur/Utilisateur";
const ListeUser = ({users,loadUser}) => {
  
  return (
    <div className="pub">
      {loadUser ? (
        <Spinner animation="border" variant="primary" />
      ) : users === null || users.length === 0 ? (
        <h2>Nothing to show !!</h2>
      ) : (
        users.map((el) => <Utilisateur key={el._id} user={el} />)
      )}
    </div>
  );
};

export default ListeUser;