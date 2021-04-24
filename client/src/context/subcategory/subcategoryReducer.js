import { SUBCATEGORY_ERROR, GET_SUBCATEGORIES } from '../types';

const subcategoryReducer = (state, action) => {
  switch (action.type) {
    case GET_SUBCATEGORIES:
      return {
        ...state,
        subcategories: action.payload,
        loading: false
      };
    case SUBCATEGORY_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default subcategoryReducer;
