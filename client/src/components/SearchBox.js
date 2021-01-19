// import React from "react";
// import {useState} from "react"
// import {useDispatch} from "react-redux"
// import {getpubs} from "../JS/actions/pub"
// import { Button, FormControl, Form } from "react-bootstrap";
// const SearchBox = ({ history }) => {
//   const [searched, setSearched] = useState("");
// const dispatch = useDispatch()
// console.log(searched);
//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (searched.trim()) {
//       history.push(`/Home?=${searched}`);
//     } else {
//       history.push("/");
//     }
//   };
  
//   return (
//     <div>
//       <Form inline onSubmit={submitHandler}>
//         <FormControl
//           type="text"
//           name="q"
//           placeholder="Search for a pub.."
//           onChange={(e) => setSearched(e.target.value)}
//           className=" mr-sm-2 ml-sm-5"
//         />
//         <Button type="submit" className="button" onClick={() =>
//                         dispatch(getpubs({searched},history))} >
//           click
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default SearchBox;
