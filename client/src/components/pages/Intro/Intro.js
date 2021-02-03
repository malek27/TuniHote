import React from "react";
import { Link } from "react-router-dom";
import "./Intro.css"
const Itro = () => {
  return (
    <div>
      <div className="container">
        <div className="item">
          <h2>Bienvenue chez vous</h2>
          <br/>
          <h1>TuniHotes</h1>
          <br/>
          <p>
            Des maisons d'hôtes à porter de mains 
          </p>
         <Link to='/AboutUs'><button className="btn btn-primary" >En savoir plus</button> </Link>
         
        </div>
      </div>
      
    </div>
  );
};

export default Itro;
