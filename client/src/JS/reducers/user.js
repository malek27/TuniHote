import {
  LOAD_USER,
  REGISTER_USER,
  FAIL_USER,
  LOGIN_USER,
  LOGOUT_USER,
  CURRENT_USER,
  GET_ALL_USER,
  GET_USER,
  DELETE_USER,
  EDIT_USER,
} from "../const/user";

const initiState = {
  loadUser: false,
  errors: null,
  isAuth: false,
  users: [],
  user: {},
  isUpdated: false,
  role: "",
  isAdmin : false,
};

export const userReducer = (state = initiState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("isAdmin", payload.user.isAdmin);
      localStorage.setItem("role", payload.user.role);
      
      return { ...state, loadUser: false, user: payload.user, isAuth: true };
    case LOGIN_USER:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("isAdmin", payload.user.isAdmin);
      localStorage.setItem("role", payload.user.role);
      

      return { ...state, loadUser: false, user: payload.user, isAuth: true };
    case LOAD_USER:
      return { ...state, loadUser: true };
    case CURRENT_USER:
      return { ...state, loadUser: false, isAuth: true, user: payload };
    case FAIL_USER:
      return { ...state, loadUser: false, errors: payload };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("role");
      
      return { user: null, loadUser: false, errors: null, isAuth: false };
    case GET_ALL_USER:
      return { ...state, loadUser: false, users: payload };
    case GET_USER:
      return { ...state, loadUser: false, user: payload };
    case DELETE_USER:
      
     
      return { ...state,user:payload, loadUser: false};
    case EDIT_USER:
      return { ...state, loadUser: false, user: payload.user , isUpdated:true };

    default:
      return state;
  }
};
