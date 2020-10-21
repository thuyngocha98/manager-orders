// Initial State
const initialState = {
  listCustomer: [],
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CUSTOMER_ASYNC':
      return {
        ...state,
        listCustomer: action.data,
      };
    case 'UPDATE_CUSTOMER_ASYNC':
      return {
        ...state,
        listCustomer: action.data,
      };
    case 'ADD_CUSTOMER_ASYNC':
      return {
        ...state,
      };
    case 'EDIT_CUSTOMER_ASYNC':
      return {
        ...state,
      };
    case 'DELETE_CUSTOMER_ASYNC':
      return {
        ...state,
      };
    default: {
      return state;
    }
  }
};

// Exports
export default customerReducer;
