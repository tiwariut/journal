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
  SET_CURRENT_POST,
  CLEAR_CURRENT_POST,
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
  const setCurrentPost = async (id) => {
    try {
      const res = await axios.get(`/api/v1/posts/${id}`);

      dispatch({
        type: SET_CURRENT_POST,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response
      });
    }
  };

  // Clear Current Post

  // Update Post

  // Filter Post

  // Clear Filter

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        current: state.current,
        getPosts,
        setCurrentPost
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
