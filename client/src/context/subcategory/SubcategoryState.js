import React, { useReducer } from 'react';
import axios from 'axios';
import SubcategoryContext from './subcategoryContext';
import subcategoryReducer from './subcategoryReducer';
import { SUBCATEGORY_ERROR, GET_SUBCATEGORIES } from '../types';

const SubcategoryState = (props) => {
  const initialState = {
    subcategories: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(subcategoryReducer, initialState);

  // Get Subcategories
  const getSubcategories = async (categoryId) => {
    try {
      const res = await axios.get(
        `/api/v1/subcategories?category=${categoryId}`
      );

      dispatch({
        type: GET_SUBCATEGORIES,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: SUBCATEGORY_ERROR,
        payload: err.response
      });
    }
  };

  return (
    <SubcategoryContext.Provider
      value={{
        subcategories: state.subcategories,
        loading: state.loading,
        getSubcategories
      }}
    >
      {props.children}
    </SubcategoryContext.Provider>
  );
};

export default SubcategoryState;
