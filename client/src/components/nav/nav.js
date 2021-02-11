import {
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { logout } from "../../JS/actions/user";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { filterPub } from "../../JS/actions/pub";

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
    if (titre !== "") {
      dispatch(filterPub(titre));
    }
  }, [dispatch, titre]);
 
  // localStorage.getItem('role')==='utilisateur'
  // localStorage.getItem('role')==="maison d'hôte"
  // localStorage.getItem("token")
  // localStorage.getItem("isAdmin")==="true"
  
   
  return (localStorage.getItem("token") && localStorage.getItem("isAdmin")==="true") ? (
    <div className="all">
      <Navbar className="navbar" expand="xl" bg="light" variant="light">
        <Navbar.Brand href="/">TuniHotes</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/Home">Acceuil</Nav.Link>
          <Nav.Link href="/AboutUs">contactez-nous</Nav.Link>
          
                  {/* <MDBIcon icon="user" /> */}
          <NavDropdown title="Profil" icon="user" id="basic-nav-dropdown">
            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png"/> */}
            <NavDropdown.Item href="/Profile">Profil</NavDropdown.Item>
            <NavDropdown.Item href="/addPub">
              Ajout publication
            </NavDropdown.Item>
            <NavDropdown.Item href="/mypubs">Mes publications</NavDropdown.Item>
            <NavDropdown.Divider />
            {/* <NavDropdown.Item href="/reservationM">
              Reservations
            </NavDropdown.Item> */}
            <NavDropdown.Item href="/ListeUser">
              Liste utilisateur
            </NavDropdown.Item>
            <NavDropdown.Item href="/ListePub">
              Liste publication
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link
            onClick={() => {
              dispatch(logout());
              history.push("/SignUp");
            }}
          >
            Deconnexion
          </Nav.Link>
        </Nav>
        <Form inline onSubmit={handleSubmit}>
          <FormControl
            type="text"
            placeholder="Recherche"
            className="mr-sm-2"
            onChange={(e) => setTitre(e.target.value)}
          />
          <Button
            variant="outline-primary"
            onClick={() => {
              dispatch(filterPub(titre));
            }}
          >
            Recherche
          </Button>
        </Form>
      </Navbar>
    </div>
  ) : (localStorage.getItem("token") && localStorage.getItem('role')==="maison d'hôte" )? (
    <div className="all">
      <Navbar className="navbar" expand="xl" bg="light" variant="light">
        <Navbar.Brand href="/">TuniHotes</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/Home">Acceuil</Nav.Link>
          <Nav.Link href="/AboutUs">contactez-nous</Nav.Link>
          <NavDropdown title="Profil" id="basic-nav-dropdown">
            <NavDropdown.Item href="/Profile">Profil</NavDropdown.Item>
            <NavDropdown.Item href="/addPub">
              Ajout publication
            </NavDropdown.Item>
            <NavDropdown.Item href="/mypubs">Mes publications</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/reservationM">
              Reservations
            </NavDropdown.Item>
            <NavDropdown.Item href="/reservationA">
              Reservations accepter
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link
            onClick={() => {
              dispatch(logout());
              history.push("/SignUp");
            }}
          >
            Deconnexion
          </Nav.Link>
        </Nav>
        <Form inline onSubmit={handleSubmit}>
          <FormControl
            type="text"
            placeholder="Recherche"
            className="mr-sm-2"
            onChange={(e) => setTitre(e.target.value)}
          />
          <Button
            variant="outline-primary"
            onClick={() => {
              dispatch(filterPub(titre));
            }}
          >
            Recherche
          </Button>
        </Form>
      </Navbar>
    </div>
  ) : (localStorage.getItem("token") && localStorage.getItem('role')==='utilisateur') ? (
    <div className="all">
      <Navbar className="navbar" expand="xl" bg="light" variant="light">
        <Navbar.Brand href="/">TuniHotes</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/Home">Acceuil</Nav.Link>
          <Nav.Link href="/AboutUs">contactez-nous</Nav.Link>
          <NavDropdown title="Profil" id="basic-nav-dropdown">
            <NavDropdown.Item href="/Profile">Profil</NavDropdown.Item>
            <NavDropdown.Item href="/reservationM">
              Reservations
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link
            onClick={() => {
              dispatch(logout());
              history.push("/SignUp");
            }}
          >
            Deconnexion
          </Nav.Link>
        </Nav>
        <Form inline onSubmit={handleSubmit}>
          <FormControl
            type="text"
            placeholder="Recherche"
            className="mr-sm-2"
            onChange={(e) => setTitre(e.target.value)}
          />
          <Button
            variant="outline-primary"
            onClick={() => {
              dispatch(filterPub(titre));
            }}
          >
            Recherche
          </Button>
        </Form>
      </Navbar>
    </div>
  ) : (
    <div className="all">
      <Navbar className="navbar" expand="lg" bg="light" variant="light">
        <Navbar.Brand href="/">TuniHotes</Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link href="/Home">Acceuil</Nav.Link>
          <Nav.Link href="/AboutUs">contactez-nous</Nav.Link>
          <Nav.Link href="/SignUp">Connection</Nav.Link>
        </Nav>
        <Form inline onSubmit={handleSubmit}>
          <FormControl
            type="text"
            placeholder="Recherche"
            className="mr-sm-2"
            onChange={(e) => setTitre(e.target.value)}
          />
          <Button
            variant="outline-primary"
            onClick={() => {
              dispatch(filterPub(titre));
            }}
          >
            Recherche
          </Button>
        </Form>
      </Navbar>
    </div>
  );
};

export default Nave;
