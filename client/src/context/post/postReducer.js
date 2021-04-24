import {
  POST_ERROR,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  SET_CURRENT_POST,
  CLEAR_CURRENT_POST,
  UPDATE_POST,
  FILTER_POSTS,
  CLEAR_FILTER
} from '../types';

const postReducer = (state, action) => {
  switch (action.type) {
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
    case POST_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default postReducer;
