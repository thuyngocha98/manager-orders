// Initial State
const initialState = {
  listProduct: [],
  networkStatus: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NETWORK_STATUS_ASYNC':
      return {
        ...state,
        networkStatus: action.status,
      };
    case 'GET_PRODUCT_ASYNC':
      return {
        ...state,
        listProduct: action.data,
      };
    case 'UPDATE_PRODUCT_ASYNC':
      return {
        ...state,
        listProduct: action.data,
      };
    case 'ADD_PRODUCT_ASYNC':
      return {
        ...state,
      };
    case 'EDIT_PRODUCT_ASYNC':
      return {
        ...state,
      };
    case 'UPDATE_LINK_IMAGE_PRODUCT_ASYNC':
      return {
        ...state,
      };
    case 'DELETE_IMAGE_PRODUCT_ASYNC':
      return {
        ...state,
      };
    case 'DELETE_PRODUCT_ASYNC':
      return {
        ...state,
      };
    default: {
      return state;
    }
  }
};

// Exports
export default productReducer;
