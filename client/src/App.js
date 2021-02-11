import { Switch, Route, useHistory } from "react-router-dom";
import SignUp from "./components/signUp/SignUp";
import SingelPub from "./components/pages/SingelPub/SingelPub";
import PrivateRoute from "./components/routes/PrivateRoute";
import RoleRoute from "./components/routes/RoleRoute";
import Admin from "./components/routes/Admin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Nave from "./components/nav/nav";
import AboutUs from "./components/pages/About/AboutUs";
import Error from "./components/pages/Error";
import AddPub from "./components/AddPub/AddPub";
import EditPub from "./components/Edit/EditPub";
import EditUser from "./components/Edit/EditUser";
import ReservationM from "./components/Reservations/ReservationM";
import Home from "./components/pages/Home";
import ListeU from "./components/ListeU/ListeU";
// import ListeUser from "./components/ListeUser";
// import ListePub from "./components/ListePub";
import ListeP from "./components/ListeP/ListeP";
import Utilisateur from "./components/utilisateur/Utilisateur";
import { current } from "./JS/actions/user";
import Intro from "./components/pages/Intro/Intro"
import Mypubs from "./components/My pub/Mypubs";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReservationA from "./components/Reservations/ReservationA";
import Footer from "./components/Footer"
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

function App() {
  const user = useSelector((state) => state.userReducer.user);
  const users = useSelector((state) => state.userReducer.users);
  const loadUser = useSelector((state) => state.userReducer.loadUser);
  const pubs = useSelector((state) => state.pubReducer.pubs);
  const pub = useSelector((state) => state.pubReducer.pub);
  const loadpub = useSelector((state) => state.pubReducer.loadpub);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(current());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <div className="nave">
        <Nave history={history} />
      </div>
<br/>
      <div className="home">
        <Switch>
          <Route exact path="/"  component={Intro}/>
          <Route
            exact
            path="/Home"
            render={() => <Home pubs={pubs&&pub} loadpub={loadpub} />}
          />
          <Admin
            path="/ListeUser"
            render={() => <ListeU users={users} loadUser={loadUser} />}
          />
          {/* <Admin
            path="/ListeUser"
            render={() => <ListeUser users={users} loadUser={loadUser} />}
          /> */}
          <PrivateRoute
            path="/Profile"
            render={() => <Utilisateur user={user} loadUser={loadUser} />}
          />
          <Route path="/AboutUs" component={AboutUs} />
          <Route path="/SignUp" component={SignUp} />
          <RoleRoute path="/AddPub" component={AddPub} />
          <Admin path="/ListePub" component={ListeP} />
          {/* <Admin path="/ListePub" component={ListePub} /> */}
          <RoleRoute path="/reservationM" component={ReservationM} />
          <RoleRoute path="/reservationA" component={ReservationA} />
          <RoleRoute path="/mypubs" component={Mypubs} />
          <PrivateRoute path="/SingelPub/:id" 
          render={(props)=> <SingelPub pub={pub&&pub} user={user&&user}  {...props} />} /> 
          <Route path="/EditPub" component={EditPub} />
          <Route path="/EditUser" component={EditUser} />
          <Route path="/search/:searched" component={Home} />
          <Route path="/*" component={Error} />
        </Switch>
      </div>
      <br/>
      <br/>
      <br/>
      {/* <footer className="blockquote-footer">
        Developper par : <cite title="Source Title">Malek Marzouki ©®™</cite>
        <br/>
        contactez-nous par : 
        <br/>
         - email : TuniHoteM@gmail.com
        <br/>
                   - telephone : +21623091754
      </footer> */}
      <Footer/>
    </div>
  );
}

export default App;
