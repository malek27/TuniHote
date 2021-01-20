import { Form, FormControl, Nav, Navbar, NavDropdown,Button } from "react-bootstrap";
import { logout } from "../../JS/actions/user";
import { useDispatch } from "react-redux";
import {useState,useEffect} from "react"
import { filterPub,getpubs } from "../../JS/actions/pub";

import "bootstrap/dist/css/bootstrap.min.css";
import "./nav.css";

const Nave = ({ history }) => {

  const [titre, setTitre] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(filterPub(titre));
  };
  useEffect(() => {
    if (titre === "") { dispatch(getpubs()) }
    else { dispatch(filterPub(titre)) }
  }, [dispatch,titre]);
  const RoleM = localStorage.getItem("role","maison d'hôte") ;
  const RoleU = localStorage.getItem("role","utilisateur") ;
  const isAuth = localStorage.getItem("token") ;
  return ( 
  (isAuth && RoleM) ? 
    <div className="all">
      <Navbar className="navbar" expand="xl" bg="light" variant="light">
        <Navbar.Brand href="/">TuniHotes</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/Home">Home</Nav.Link>
          <Nav.Link href="/AboutUs">About Us</Nav.Link>
          <NavDropdown title="Option" id="basic-nav-dropdown">
            <NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/addPub">Add pub</NavDropdown.Item>
            <NavDropdown.Item href="/PubList">Liste pub</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/reservation">Reservation</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link
            onClick={() => {
              dispatch(logout());
              history.push("/SignUp");
            }}
          >
            Logout
          </Nav.Link>
        </Nav>
        <Form inline onSubmit={handleSubmit}>
          <FormControl
            type='text'
            placeholder='Search'
            className='mr-sm-2'
            onChange={(e) => setTitre(e.target.value)}
          />
          <Button
            variant='outline-primary'
            onClick={() => {
              dispatch(filterPub(titre));
            }}
          >
            Search
          </Button>
          </Form>
      </Navbar>
    </div> : (isAuth && RoleU) ?
    <div className="all">
    <Navbar className="navbar" expand="xl" bg="light" variant="light">
      <Navbar.Brand href="/">TuniHotes</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/Home">Home</Nav.Link>
        <Nav.Link href="/AboutUs">About Us</Nav.Link>
        <Nav.Link href="/Profile">Profile</Nav.Link>
        <Nav.Link href="/SignUp">Sing Up</Nav.Link>
        <Nav.Link
          onClick={() => {
            dispatch(logout());
            history.push("/SignUp");
          }}
        >
          Logout
        </Nav.Link>
      </Nav>
      <Form inline onSubmit={handleSubmit}>
        <FormControl
          type='text'
          placeholder='Search'
          className='mr-sm-2'
          onChange={(e) => setTitre(e.target.value)}
        />
        <Button
          variant='outline-primary'
          onClick={() => {
            dispatch(filterPub(titre));
          }}
        >
          Search
        </Button>
        </Form>
    </Navbar>
  </div> :
     <div className="all">
     <Navbar className="navbar" expand="xl" bg="light" variant="light">
       <Navbar.Brand href="/">TuniHotes</Navbar.Brand>
       <Nav className="mr-auto">
         <Nav.Link href="/Home">Home</Nav.Link>
         <Nav.Link href="/AboutUs">About Us</Nav.Link>
         <Nav.Link href="/SignUp">Sing Up</Nav.Link>
       </Nav>
       <Form inline onSubmit={handleSubmit}>
         <FormControl
           type='text'
           placeholder='Search'
           className='mr-sm-2'
           onChange={(e) => setTitre(e.target.value)}
         />
         <Button
           variant='outline-primary'
           onClick={() => {
             dispatch(filterPub(titre));
           }}
         >
           Search
         </Button>
         </Form>
     </Navbar>
     </div> 
  );
};

export default Nave;
