import { Switch, Route, useHistory } from "react-router-dom";
import SignUp from "./components/signUp/SignUp";
import SingelPub from "./components/pages/SingelPub";
import PrivateRoute from "./components/routes/PrivateRoute";
import RoleRoute from "./components/routes/RoleRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Nave from "./components/nav/nav";
import AboutUs from "./components/pages/AboutUs";
import Error from "./components/pages/Error";
import AddPub from "./components/AddPub/AddPub";
import EditPub from "./components/Edit/EditPub";
import EditUser from "./components/Edit/EditUser";
import reservation from "./components/reservation";
import Home from "./components/pages/Home";
import ListeUser from "./components/ListeUser";
import Utilisateur from "./components/utilisateur/Utilisateur";
import { current } from "./JS/actions/user";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

function App() {
  const user = useSelector((state) => state.userReducer.user);
  const users = useSelector((state) => state.userReducer.users);
  const loadUser = useSelector((state) => state.userReducer.loadUser);
  const pubs = useSelector((state) => state.pubReducer.pubs);
  const pub = useSelector((state) => state.pubReducer.pub);
  // const comment = useSelector((state) => state.pubReducer.comment);
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

      <div className="home">
        <Switch>
          <Route
            exact
            path={["/Home", "/"]}
            render={() => <Home pubs={pubs&&pub} loadpub={loadpub} />}
          />
          <Route
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
          {/* <RoleRoute path="/PubList" component={PubList} /> */}
          <Route path="/reservation" component={reservation} />
          <PrivateRoute path="/SingelPub/:id" 
          render={(props)=> <SingelPub pub={pub&&pub} user={user&&user}  {...props} />} /> 
          <Route path="/EditPub" component={EditPub} />
          <Route path="/EditUser" component={EditUser} />
          {/* <Route path="/forget/password" component={forgetPassword} /> */}
          <Route path="/search/:searched" component={Home} />
          <Route path="/*" component={Error} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
