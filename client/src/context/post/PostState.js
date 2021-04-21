import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import PostContext from './postContext';
import postReducer from './postReducer';
import {
  POST_ERROR,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_POST,
  FILTER_POSTS,
  CLEAR_FILTER
} from '../types';

const PostState = (props) => {
  const initialState = {
    posts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(postReducer, initialState);

  // Get Posts
  const getPosts = async () => {
    try {
      const res = await axios.get('/api/v1/posts');

      dispatch({
        type: GET_POSTS,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response
      });
    }
  };

  // Add Post

  // Delete Post

  // Set Current Post

  // Clear Current Post

  // Update Post

  // Filter Post

  // Clear Filter

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        getPosts
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
