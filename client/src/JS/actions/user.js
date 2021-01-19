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
import axios from "axios";

export const registerUser = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await axios.post("/user/register", user);
    dispatch({ type: REGISTER_USER, payload: result.data });
    history.push("/Home");
  } catch (error) {
    const { errors } = error.response.data;
    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    }
    //dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};

export const loginUser = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await axios.post("/user/login", user);
    dispatch({ type: LOGIN_USER, payload: result.data });
    history.push("/Home");
  } catch (error) {
    const { errors, msg } = error.response.data;
    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    }
    if (msg) {
      alert(msg);
    }
    // dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};

export const current = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get("/user/current", options);
    dispatch({ type: CURRENT_USER, payload: result.data.user });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};

export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const getusers = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get("/user/ListeUser",options);
    dispatch({ type: GET_ALL_USER, payload: result.data.response });
  } catch (e) {
    dispatch({ type: FAIL_USER, payload: e.message });
  }
};

// get user by id

export const getuser = (id) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get(`/user/${id}`,options);
    dispatch({ type: GET_USER, payload: result.data.response });
  } catch (e) {
    dispatch({ type: FAIL_USER, payload: e.message });
  }
};

// delete user by id

export const deleteUserById = (id) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.delete(`/user/${id}`,options);
    dispatch({ type: DELETE_USER, payload: result });
  } catch (e) {
    dispatch({ type: FAIL_USER, payload: e.message });
  }
};

//Edit an existing pub

export const editUser = (id, user, history) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.put(`/user/Profile/${id}`, user,options);
    dispatch({ type: EDIT_USER, payload: result.data });
    dispatch(getuser(id));
    // history.push(`/Profile/${id}`);
    
  } catch (e) {
    dispatch({ type: EDIT_USER, payload: e });
  }
};
