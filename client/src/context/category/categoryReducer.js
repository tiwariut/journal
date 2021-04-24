import { CATEGORY_ERROR, GET_CATEGORIES } from '../types';

const categoryReducer = (state, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default categoryReducer;
