import React from "react";
import PubList from "../PubList/PubList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { current } from "../../JS/actions/user";

const Home = ({ loadpub, pubs }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {dispatch(current())};
  }, [dispatch]);
  return (
    <div>
      <h1>Bienvenue à TuniHotes</h1>
      <p>cela est une intro au site</p>
      <PubList pubs={pubs} loadpub={loadpub} />
    </div>
  );
};

export default Home;
