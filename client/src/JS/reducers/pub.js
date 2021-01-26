import {
  LOAD_PUB,
  REGISTER_PUB,
  FAIL_PUB,
  GET_ALL_PUB,
  GET_PUB,
  FILTER_PUB,
  DELETE_PUB,
  EDIT_PUB,
  ADD_COMMENT,
  GET_ALL_COMS,
  LOAD_COMS,
  UPDATE_LIKES,
  UPDATE_DISLIKES,
  RATE,
  GET_ALL_RESERVATION,
  LOAD_RESERVATION,
  GET_MY_PUB
} from "../const/pub";

const initiState = {
  pubs: [],
  mypubs:[],
  loadpub: true,
  loadcoms: true,
  loadresrvs:true,
  errors: null,
  pub: {},
  isUpdated: false,
  comments: [],
  likes: [],
  dislikes: [],
  reservations:[],
};

export const pubReducer = (state = initiState, { type, payload }) => {
  switch (type) {
    case REGISTER_PUB:
      return { ...state, loadpub: false, pub: payload.pub };

    case LOAD_PUB:
      return { ...state, loadpub: true };
    case LOAD_COMS:
      return { ...state, loadcoms: true };

    case FAIL_PUB:
      return { ...state, loadpub: false, errors: payload };

    case GET_PUB:
      return { ...state, loadpub: false, pub: payload };
    case GET_MY_PUB:
      return { ...state, loadpub: false, mypubs: payload };

    case GET_ALL_PUB:
      return { ...state, loadpub: false, pubs: payload };

    case FILTER_PUB:
      return { ...state, loadpub: false, pubs: payload };

    case DELETE_PUB:
      return { ...state, loadpub: false };
    case EDIT_PUB:
      return { ...state, loadpub: false, pub: payload.pub, isUpdated: true };
    case UPDATE_LIKES:
      return {
        ...state,
        likes: [...state.likes, payload.user],
        loadpub: false,
      };

    case UPDATE_DISLIKES:
      return {
        ...state,
        dislikes: [...state.dislikes, payload.user],
        loadpub: false,
      };

    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, payload.user],
        loadcoms: false,
      };
    case GET_ALL_COMS:
      return { ...state, loadcoms: false, comments: payload };
    case GET_ALL_RESERVATION:
      return { ...state, loadresrvs: false, reservations: payload };
    case LOAD_RESERVATION:
      return { ...state, loadresrvs: true };
    case RATE:
      return {
        ...state,
        rate: payload,
      };
    default:
      return state;
  }
};
