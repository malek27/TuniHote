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
  REMOVE_COMMENT,
  EDIT_COMMENT,
  UPDATE_LIKES,
  UPDATE_DISLIKES,
  RATE,
} from "../const/pub";

const initiState = {
  pubs: [],
  loadpub: false,
  errors: null,
  pub: {},
  isUpdated: false,
  comments: [],
  likes:[],
  dislike:[]
};

export const pubReducer = (state = initiState, { type, payload }) => {
  switch (type) {
    case REGISTER_PUB:
      return { ...state, loadpub: false, pub: payload.pub };

    case LOAD_PUB:
      return { ...state, loadpub: true };

    case FAIL_PUB:
      return { ...state, loadpub: false, errors: payload };

    case GET_PUB:
      return { ...state, loadpub: false, pub: payload };

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
        pubs: state.pubs.map((pub) =>
          pub._id === payload.id ? { ...pub, likes: payload.likes } : pub
        ),
        loading: false,
      };

    case UPDATE_DISLIKES:
      return {
        ...state,
        pubs: state.pubs.map((pub) =>
          pub._id === payload.id
            ? { ...pub, dislikes: payload.dislikes }
            : pub
        ),
        loading: false,
      };

    case ADD_COMMENT:
      return {
        ...state,
        pub: { ...state.pub, comments: payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        pub: {
          ...state.pub,
          comments: state.pub.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
      case EDIT_COMMENT:
        return {
          ...state,
          pub: { ...state.pub, comments: payload },
          loading: false,
        };
    case RATE:
      return {
        ...state,
        rate: payload,
      };
    default:
      return state;
  }
};
