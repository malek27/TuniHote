import React from "react";
import { Spinner } from "react-bootstrap";
import Pub from "./Pub/Pub";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMypubs } from "../JS/actions/pub";


const Mypubs = () => {
  const loadpub = useSelector((state) => state.pubReducer.loadpub);
  const pubs = useSelector((state) => state.pubReducer.pubs);
//   const postedBy = useSelector((state) => state.pubReducer.postedBy);
//   const user = useSelector((state) => state.userReducer.user);
// const mypubs = postedBy._id === user._id
const dispatch = useDispatch()
  useEffect(() => {
      dispatch(getMypubs())
  }, [])

  return ( 
    <ul className="cards">
      {loadpub ? (
        <Spinner className="spinner" animation="border" variant="primary" />
      ) : ((pubs&&pubs) === null || (pubs.length&&pubs.length === 0)) ? 
        (<h2>Nothing to show !!</h2>)
       :(
        pubs.map((el) => <Pub key={el._id} pub={el} />)
      )}
    </ul>
  )
};

export default Mypubs;
