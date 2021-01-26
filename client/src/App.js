import { Switch, Route, useHistory } from "react-router-dom";
import SignUp from "./components/signUp/SignUp";
import SingelPub from "./components/pages/SingelPub";
import PrivateRoute from "./components/routes/PrivateRoute";
import RoleRoute from "./components/routes/RoleRoute";
import Admin from "./components/routes/Admin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Nave from "./components/nav/nav";
import AboutUs from "./components/pages/AboutUs";
import Error from "./components/pages/Error";
import AddPub from "./components/AddPub/AddPub";
import EditPub from "./components/Edit/EditPub";
import EditUser from "./components/Edit/EditUser";
import ReservasionM from "./components/ReservasionM";
import ReservasionU from "./components/ReservasionU";
import Home from "./components/pages/Home";
import ListeUser from "./components/ListeUser";
import ListePub from "./components/ListePub";
import Utilisateur from "./components/utilisateur/Utilisateur";
import { current } from "./JS/actions/user";
import Intro from "./components/pages/Intro"

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Mypubs from "./components/Mypubs";
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
            render={() => <ListeUser users={users} loadUser={loadUser} />}
          />
          <PrivateRoute
            path="/Profile"
            render={() => <Utilisateur user={user} loadUser={loadUser} />}
          />
          <Route path="/AboutUs" component={AboutUs} />
          <Route path="/SignUp" component={SignUp} />
          <RoleRoute path="/AddPub" component={AddPub} />
          <Admin path="/ListePub" component={ListePub} />
          <RoleRoute path="/reservasionM" component={ReservasionM} />
          <RoleRoute path="/mypubs" component={Mypubs} />
          <PrivateRoute path="/reservationU" component={ReservasionU} />
          <PrivateRoute path="/SingelPub/:id" 
          render={(props)=> <SingelPub pub={pub&&pub} user={user&&user}  {...props} />} /> 
          <Route path="/EditPub/:id" component={EditPub} />
          <Route path="/EditUser" component={EditUser} />
          {/* <Route path="/forget/password" component={forgetPassword} /> */}
          <Route path="/search/:searched" component={Home} />
          <Route path="/*" component={Error} />
        </Switch>
      </div>
      <br/>
      <br/>
      <br/>
      <footer className="blockquote-footer">
        Developed by <cite title="Source Title">Malek Marzouki ©®™</cite>
        <br/>
        contact us  - email : TuniHoteM@gmail.com
        <br/>
                   - phone : +21623091754
      </footer>
    </div>
  );
}

export default App;
