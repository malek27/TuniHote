import React from "react";
import { Link } from "react-router-dom";
import "./Intro.css"
const Itro = () => {
  return (
    <div>
      <div className="container">
        <div className="item">
          <h3>Welcome home</h3>
          <br/>
          <h1>TuniHotes</h1>
          <br/>
          <p>
            des maisons d'hôtes à porter de mains 
          </p>
         <Link to='/AboutUs'><button className="btn btn-primary" > Find Out More</button> </Link>
         
        </div>
      </div>
      
    </div>
  );
};

export default Itro;
