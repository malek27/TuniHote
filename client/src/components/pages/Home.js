import React from "react";
import PubList from "../PubList/PubList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { current } from "../../JS/actions/user";
import { getpubs } from "../../JS/actions/pub";

const Home = ({ loadpub, pubs }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {dispatch(current())}
    dispatch(getpubs());
  }, [dispatch]);
  return (
    <div>
      <h1>Bienvenue à TuniHotes</h1>
      <p>Découvrez nos differants choix de maison d'hôtes</p>
      <PubList pubs={pubs} loadpub={loadpub} />
    </div>
  );
};

export default Home;
