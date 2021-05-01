import React, { useReducer } from 'react';
import axios from 'axios';
import PostContext from './postContext';
import postReducer from './postReducer';
import {
  POST_ERROR,
  GET_POSTS,
  SET_CURRENT_POST,
  CLEAR_CURRENT_POST,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST
} from '../types';

const PostState = (props) => {
  const initialState = {
    posts: null,
    current: null,
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
        payload: err.response.data.error
      });
    }
  };

  // Get Single Post
  const getPost = async (id) => {
    try {
      const res = await axios.get(`/api/v1/posts/${id}`);

      setCurrentPost(res.data.data);
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.data.error
      });
    }
  };

  // Set Current Post
  const setCurrentPost = (post) => {
    dispatch({ type: SET_CURRENT_POST, payload: post });
  };

  // Clear Current Post
  const clearCurrentPost = () => {
    dispatch({ type: CLEAR_CURRENT_POST });
  };

  // Add Post
  const addPost = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/v1/posts', formData, config);

      dispatch({
        type: ADD_POST,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.data.error
      });
    }
  };

  // Update Post
  const updatePost = async (id, post) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/v1/posts/${id}`, post, config);

      dispatch({
        type: UPDATE_POST,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.data.error
      });
    }
  };

  // Delete Post
  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);

      dispatch({
        type: DELETE_POST,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.data.error
      });
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        current: state.current,
        error: state.error,
        loading: state.loading,
        getPosts,
        getPost,
        setCurrentPost,
        clearCurrentPost,
        addPost,
        updatePost,
        deletePost
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
