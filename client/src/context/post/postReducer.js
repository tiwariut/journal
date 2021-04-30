import {
  POST_ERROR,
  GET_POSTS,
  SET_CURRENT_POST,
  CLEAR_CURRENT_POST,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST
} from '../types';

const postReducer = (state, action) => {
  switch (action.type) {
    case POST_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case SET_CURRENT_POST:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_POST:
      return {
        ...state,
        current: null
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false
      };
    default:
      return state;
  }
};

export default postReducer;
