import React, { useReducer } from 'react';
import axios from 'axios';
import CategoryContext from './categoryContext';
import categoryReducer from './categoryReducer';
import { CATEGORY_ERROR, GET_CATEGORIES } from '../types';

const CategoryState = (props) => {
  const initialState = {
    categories: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(categoryReducer, initialState);

  // Get Categories
  const getCategories = async () => {
    try {
      const res = await axios.get('/api/v1/categories');

      dispatch({
        type: GET_CATEGORIES,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: CATEGORY_ERROR,
        payload: err.response
      });
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories: state.categories,
        loading: state.loading,
        getCategories
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryState;
