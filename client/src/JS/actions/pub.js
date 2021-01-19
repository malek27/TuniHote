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
  ADD_COMMENT,
  REMOVE_COMMENT,
  EDIT_COMMENT,
  RATE,
} from "../const/pub";
import axios from "axios";
import { setAlert } from "./alert";

// add pub

export const registerPub = (pub,userId, history) => async (dispatch) => {
  dispatch({ type: LOAD_PUB });
  try {
    const options = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const result = await axios.post("/pub/register", pub,options);
    dispatch({ type: GET_ALL_PUB, payload: result.data.response });
    history.push("/Home");
  } catch (error) {
    console.log(error)
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
    let result = await axios.get(`/pub/pub/${id}`,options);
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
    let result = await axios.deleteOne(`/pub/${id}`,options);
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
    let result = await axios.put(`/pub/SingelPub/${id}`, pub,options);
    dispatch({ type: EDIT_PUB, payload: result.data });
    history.push(`/SingelPub/${id}`);
    dispatch(getpubById(id));
  } catch (e) {
    dispatch({ type: FAIL_PUB, payload: e.message });
  }
};

// Add comment

export const addComment = (userId,pub) => async (dispatch) => {
  const options = { headers: { authorization: localStorage.getItem("token") } };
  try {
    const res = await axios.post(`/pub/comment/${userId}`,pub, options);
    dispatch({ type: ADD_COMMENT, payload: res.data });
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: FAIL_PUB,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// edit comment

export const editComment = (pubId, commentId, text) => async (dispatch) => {
  const options = { headers: { authorization: localStorage.getItem("token") } };
  try {
    const res = await axios.put(`/pub/comment/${pubId}`, commentId, text, options);
    dispatch({ type: EDIT_COMMENT, payload: res.data });
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: FAIL_PUB,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Delete comment

export const deleteComment = (pubId, commentId) => async (dispatch) => {
  const options = { headers: { authorization: localStorage.getItem("token") } };
  try {
    await axios.delete(`/pub/comment/${pubId}/${commentId}`, options);
    dispatch({ type: REMOVE_COMMENT, payload: commentId });
    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: FAIL_PUB,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

//Add like
export const addLike = (id) => async (dispatch) => {
  const options = { headers: { authorization: localStorage.getItem("token") } };
  try {
    const res = await axios.put(`/pub/like/${id}`, options);
    dispatch({ type: UPDATE_LIKES, payload: { id, likes: res.data } });
  } catch (err) {
    console.log(err);
    dispatch({
      type: FAIL_PUB,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Remove like

export const removeLike = (id) => async (dispatch) => {
  const options = { headers: { authorization: localStorage.getItem("token") } };
  try {
    const res = await axios.put(`/pub/dislike/${id}`, options);
    dispatch({ type: UPDATE_DISLIKES, payload: { id, dislikes: res.data } });
  } catch (err) {
    dispatch({
      type: FAIL_PUB,
      payload: { msg: err.response.data.msg, status: err.response.status },
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
    const res = await axios.post(`/pub/rate/${postId}`, formData, config,options);
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
