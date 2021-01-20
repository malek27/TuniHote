import {
  GET_ALL_PUB,
  GET_PUB,
  FAIL_PUB,
  LOAD_PUB,
  FILTER_PUB,
  DELETE_PUB,
  EDIT_PUB,
  UPDATE_LIKES,
  UPDATE_DISLIKES,
  GET_ALL_COMS,
  RATE,
  LOAD_COMS,
} from "../const/pub";
import axios from "axios";
import { setAlert } from "./alert";

// add pub

export const registerPub = (pub, userId, history) => async (dispatch) => {
  dispatch({ type: LOAD_PUB });
  try {
    const options = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const result = await axios.post("/pub/register", pub, options);
    dispatch({ type: GET_ALL_PUB, payload: result.data.response });
    history.push("/Home");
  } catch (error) {
    console.log(error);
    const { errors } = error.response.data;
    if (Array.isArray(errors)) {
      errors.forEach((e) => alert(e.message));
    }
    //dispatch({ type: FAIL_PUB, payload: error.response.data });
  }
};

//get pub by id

export const getpubById = (id) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get(`/pub/pub/${id}`, options);
    dispatch({ type: GET_PUB, payload: result.data.response });
  } catch (e) {
    console.log(e.message);
  }
};

// get all pub

export const getpubs = () => async (dispatch) => {
  dispatch({ type: LOAD_PUB });

  try {
    let result = await axios.get("/pub");
    dispatch({ type: GET_ALL_PUB, payload: result.data.response });
  } catch (e) {
    dispatch({ type: FAIL_PUB, payload: e.message });
  }
};

// search pub

export const filterPub = (titre) => async (dispatch) => {
  try {
    let result = await axios.get(`/pub/search/${titre}`);
    dispatch({ type: FILTER_PUB, payload: result.data });
  } catch (e) {
    dispatch({ type: FAIL_PUB, payload: e.message });
  }
};

// delete pub by id

export const deletePubById = (id) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.deleteOne(`/pub/${id}`, options);
    dispatch({ type: DELETE_PUB, payload: result });
  } catch (e) {
    dispatch({ type: FAIL_PUB, payload: e.message });
  }
};

//Edit an existing pub

export const editPub = (id, pub, history) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.put(`/pub/SingelPub/${id}`, pub, options);
    dispatch({ type: EDIT_PUB, payload: result.data });
    history.push(`/SingelPub/${id}`);
    dispatch(getpubById(id));
  } catch (e) {
    dispatch({ type: FAIL_PUB, payload: e.message });
  }
};

// Add comment

export const addComment = (pubid, text) => async (dispatch) => {
  const options = { headers: { authorization: localStorage.getItem("token") } };
  dispatch({ type: LOAD_COMS });
  try {
    const res = await axios.post(`/pub/comment/${pubid}`, { text }, options);
    console.log("res com", res);
    // dispatch({ type: ADD_COMMENT, payload: res.data });
    dispatch(getcoms());

    alert("Comment Added", "success");
  } catch (err) {
    dispatch({
      type: FAIL_PUB,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

//get all coms
export const getcoms = () => async (dispatch) => {
  const options = { headers: { authorization: localStorage.getItem("token") } };
  dispatch({ type: LOAD_COMS });
  try {
    let result = await axios.get("/pub/comments", options);
    dispatch({ type: GET_ALL_COMS, payload: result.data.response });
  } catch (e) {
    dispatch({ type: FAIL_PUB, payload: e.message });
  }
};

//likes
export const likePost = (pubid) => async (dispatch) => {
  const options = { headers: { authorization: localStorage.getItem("token") } };
  try {
    const res = await axios.put(`/pub/like/${pubid}`, "", options);
    console.log("res", res);
    dispatch({ type: UPDATE_LIKES, payload: res.data });
    alert("Like Added", "success");
  } catch (err) {
    console.log(err);
    dispatch({
      type: FAIL_PUB,
    });
  }
};

//dislikes
export const unlikePost = (pubid) => async (dispatch) => {
  const options = { headers: { authorization: localStorage.getItem("token") } };
  try {
    const res = await axios.put(`/pub/unlike/${pubid}`, "", options);
    console.log("res unlike", res);
    dispatch({ type: UPDATE_DISLIKES, payload: res.data });
    alert("Like removed", "success");
  } catch (err) {
    dispatch({
      type: FAIL_PUB,
    });
  }
};

//Rate
export const addrate = (postId, formData) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/pub/rate/${postId}`,
      formData,
      config,
      options
    );
    dispatch({
      type: RATE,
      payload: res.data,
    });

    dispatch(setAlert("Rate success", "warning"));
  } catch (error) {
    dispatch(
      setAlert("Rating Failed or you already rated this post", "warning")
    );
  }
};
