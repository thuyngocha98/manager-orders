// Initial State
const initialState = {
  listOrders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ORDER_ASYNC':
      return {
        ...state,
        listOrders: action.data,
      };
    case 'UPDATE_ORDER_ASYNC':
      return {
        ...state,
        listOrders: action.data,
      };
    case 'ADD_ORDER_ASYNC':
      return {
        ...state,
      };
    case 'EDIT_ORDER_ASYNC':
      return {
        ...state,
      };
    case 'DELETE_ORDER_ASYNC':
      return {
        ...state,
      };
    default: {
      return state;
    }
  }
};

// Exports
export default orderReducer;
